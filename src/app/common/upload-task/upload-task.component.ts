import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireDatabase } from "@angular/fire/compat/database";

@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  // @ts-ignore
  @Input() file: File;
  @Input() userId: string;
  @Input() folderName: string;
  // @ts-ignore
  task: AngularFireUploadTask;
  // @ts-ignore
  percentage: Observable<number>;
  // @ts-ignore
  snapshot: Observable<any>;
  // @ts-ignore
  downloadURL: string;

  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase) { }

  ngOnInit() {
    // this.startUpload();
  }

  startUpload() {

    // The storage path
    const path = `${this.folderName}/${this.userId}/${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // @ts-ignore
    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
        tap(console.log),
        // The file's download URL
        finalize( async() =>  {
          this.downloadURL = await ref.getDownloadURL().toPromise();

          this.db.list(this.folderName).push(
            {
              downloadURL: this.downloadURL,
              userId: this.userId,
              path
            }
          );
        }),
    );
  }

  // @ts-ignore
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
