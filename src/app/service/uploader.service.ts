import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/compat/storage";
import { finalize, tap} from "rxjs/operators";
import { Observable } from "rxjs";
import { User } from "../common/constants";
import { Database, ref, update } from "@angular/fire/database";
import { SnackService } from "./snack.service";
import { getErrorMessageForCode } from "../common/utils/utils";
import { push } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  // @ts-ignore
  task: AngularFireUploadTask;
  // @ts-ignore
  percentage: Observable<number>;
  // @ts-ignore
  snapshot: Observable<any>;
  // @ts-ignore
  downloadURL: string;

  constructor(private storage: AngularFireStorage, private db: Database, private snackService: SnackService) {}

  startUpload(filePath: string, file: File, groupName: string, dbPath: string, layerHeight: number, layerWidth: number) {
    // Reference to storage bucket
    const fileRef = this.storage.ref(filePath);

    // The main task
    this.task = this.storage.upload(filePath, file);
    return new Promise<any>((resolve, reject) => {
      this.task.then( async () => {
          const downloadURL = await fileRef.getDownloadURL().toPromise();
          let values = {
            fileName: file.name,
            groupName: groupName,
            downloadURL: downloadURL,
            height: layerHeight,
            width: layerWidth
          }
          push(ref(this.db, dbPath), values).then((_) => {
            resolve(true);
          }).catch((_) => {
            reject(false);
          })
        }).catch((error) => {
          reject(false)
        })
    })
  }

  startUploadProfileImage(filePath: string, file: File, dbPath: string, key: string) {
    // Reference to storage bucket
    const fileRef = this.storage.ref(filePath);
    // The main task
    this.task = this.storage.upload(filePath, file);
    return new Promise<any>((resolve, reject) => {
      this.task
        .then( async () => {
          const downloadURL = await fileRef.getDownloadURL().toPromise();
          let obj = {};
          // @ts-ignore
          obj[key] = downloadURL;
          update(ref(this.db, dbPath), obj)
            .then((_) => {
              resolve(true)
              this.snackService.showSnackBar("Your account has been updated!");
            })
            .catch((error) => {
              reject(false)
              this.snackService.showSnackBar(getErrorMessageForCode("Error updating your account, please try again"));
            })
        })
        .catch((error) => {
          reject(false)
          this.snackService.showSnackBar(getErrorMessageForCode(error.code));
        })
    })
  }
}
