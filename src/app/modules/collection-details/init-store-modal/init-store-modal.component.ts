import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {
  Collection,
  COLLECTIONS_STORAGE_PATH,
  COLLECTION_IMAGES_DB_PATH,
  LAYERS_FOLDER_PATH
} from 'src/app/common/constants';
import { SnackService } from 'src/app/service/snack.service';
import { UploaderService } from 'src/app/service/uploader.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-init-store-modal',
  templateUrl: './init-store-modal.component.html',
  styleUrls: ['./init-store-modal.component.css']
})
export class InitStoreModalComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<MouseEvent>()
  @Input() collectionLayers: Map<string,Map<string, File>>;
  @Input() currentCollection: Collection | null;
  @Input() layerHeight: number;
  @Input() layerWidth: number;
  @Output() emitIsDeployed = new EventEmitter<boolean>();

  didSuccessfullyDeploy: boolean = false;

  gifUrl: string = "https://media0.giphy.com/media/Q81NcsY6YxK7jxnr4v/giphy.gif?cid=ecf05e474ri4uymdk7bx33sxwzoig4vgi8secf0eh3qhway9&rid=giphy.gif&ct=g"

  constructor(private snackService: SnackService,
    private uploadService: UploaderService,
    private auth: Auth) { }

  ngOnInit(): void {
  }

  closeModal(e: MouseEvent) {
    let target = e.target as HTMLElement;
    if (target.id !== "closeModal") {
      return;
    }

    if (this.isDeploying) {
      this.snackService.showSnackBar("Please do not close or refresh tab until the upload has completed");
      return;
    }

    this.closeEvent.emit(e);
  }

  openTermsAndConditions() {
    this.snackService.showSnackBar("Coming soon");
  }

  isDeploying: boolean = false;
  @ViewChild('checkbox1') checkbox1: ElementRef;
  @ViewChild('checkbox2') checkbox2: ElementRef;
  deploy() {
    if (this.isDeploying) {
      this.snackService.showSnackBar("Currently deploying...");
      return;
    }

    if (!(this.checkbox1.nativeElement.checked && this.checkbox2.nativeElement.checked)) {
      this.snackService.showSnackBar("Please accept and understand our user guidelines to continue");
      return;
    }

    if (!this.currentCollection) {
      return;
    }

    this.isDeploying = true;

    if (!(this.collectionLayers.size <= 20) || (this.collectionLayers.size < 1)) {
      this.isDeploying = false;
      this.snackService.showSnackBar("Please properly save your layers before you continue");
      return;
    }

    this.collectionLayers.forEach((_, groupName) => {
      this.collectionLayers.get(groupName)?.forEach((file, _) => {

        if (!this.currentCollection) {
          return;
        }

        let filePath = `${COLLECTIONS_STORAGE_PATH}/${LAYERS_FOLDER_PATH}${this.currentCollection.creatorUserId}/${this.currentCollection.collectionId}/${groupName}/${file.name}`;
        const dbPath = `${COLLECTION_IMAGES_DB_PATH}/${this.currentCollection.creatorUserId}/${this.currentCollection.collectionId}`;
        this.uploadService.startUpload(filePath, file, groupName, dbPath, this.layerHeight, this.layerWidth).catch((_) => {
          this.isDeploying = false;
          this.emitIsDeployed.emit(false);
          this.didSuccessfullyDeploy = false;
          this.snackService.showSnackBar("Oops. There was an error uploading your art! Please try again.");
          return;
        })
      })
    })
    this.isDeploying = false;
    this.didSuccessfullyDeploy = true;
    this.emitIsDeployed.emit(true)
  }
}
