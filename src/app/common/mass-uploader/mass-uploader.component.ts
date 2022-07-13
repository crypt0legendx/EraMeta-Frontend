import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { SnackService } from '../../service/snack.service';
import {
  EMPTY_STRING,
  FILE_TYPE_PNG,
  FILE_TYPE_JPG,
  FILE_TYPE_JPEG,
  FILE_TYPE_GIF
 } from '../constants';

const MAX_DROP_AMOUNT: number = 50;

@Component({
  selector: 'app-mass-uploader',
  templateUrl: './mass-uploader.component.html',
  styleUrls: ['./mass-uploader.component.scss']
})
export class MassUploaderComponent {
  @Output() filesEmitter = new EventEmitter<Map<string,File>>();
  @Input() currentFileType: string = EMPTY_STRING
  @Input() selectedHeight: number | null;
  @Input() selectedWidth: number | null;
  @ViewChild('dropZone') dropZone: ElementRef;

  fileDownloadsURLs: Map<string,File> = new Map();

  isHovering: boolean

  didEditLayers: boolean = false;

  constructor(private snackService: SnackService) { }

  ngOnInit() { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(droppedFiles: FileList) {
    if (droppedFiles.length < 1 || droppedFiles.length > MAX_DROP_AMOUNT) {
      this.snackService.showSnackBar("Please drop in between 1 and 50 files of the same type. You currentlt have: " + `${this.fileDownloadsURLs.size}` + " dropped files");
      return;
    }

    for (let i = 0; i < droppedFiles.length; i++) {

      let currentFile: File | null = droppedFiles.item(i);
      if (!currentFile) {
        this.snackService.showSnackBar("Unable to read dropped file. Please try again");
        return;
      }

      if (this.currentFileType === EMPTY_STRING) {
        this.currentFileType = currentFile.type;
      }

      // If file is not proper type.
      if (currentFile.type !== this.currentFileType) {
        this.snackService.showSnackBar("Wrong file type for: " + currentFile.name + ". Needs to be " + this.currentFileType);
        return;
      }

      // // Max file size : 25MB // Global Max
      if (currentFile.size > 25000000) {
        this.snackService.showSnackBar("Max file size of 25MB. Please try again. FILENAME: " + currentFile.name);
        return;
      }

      // // @ts-ignore
      if (!((currentFile.type === FILE_TYPE_PNG) ||
      (currentFile.type === FILE_TYPE_JPG) ||
      (currentFile.type === FILE_TYPE_JPEG) ||
      (currentFile.type === FILE_TYPE_GIF) ||
      (currentFile.type === "video/mp4"))) {
        this.snackService.showSnackBar("Only .gif, .mp4, .png & .jpg files accepted");
        return;
      }

      if(currentFile.name.length > 25) {
        this.snackService.showSnackBar(currentFile.name + ". Trait name cannot be more tan 25 chars");
        return;
      }

      let downloadURL = window.URL.createObjectURL(currentFile) as string;

      // Check does not work with tripple (===). Only with double (==)
      const img = new Image()
      img.onload = () => {
          if (img.height != this.selectedHeight) {
            this.snackService.showSnackBar(`${currentFile?.name} height is not equal to ${this.selectedHeight}`)
          } else if (img.width != this.selectedWidth) {
            this.snackService.showSnackBar(`${currentFile?.name} width is not equal to ${this.selectedWidth}`)
          } else if (currentFile) {
            this.fileDownloadsURLs.set(downloadURL, currentFile);
            this.didEditLayers = true;
          }
      }
      img.src = downloadURL;
    }
  }

  saveLayersToMemory() {
    this.didEditLayers = false;
    if (this.fileDownloadsURLs.size < 1) {
      this.currentFileType = EMPTY_STRING;
    }

    this.filesEmitter.emit(this.fileDownloadsURLs);
  }

  deleteLayer(key: string) {
    this.snackService.showSnackBar("Removed layer: " + this.fileDownloadsURLs.get(key)?.name)
    this.fileDownloadsURLs.delete(key);
    this.didEditLayers = true;
  }
}