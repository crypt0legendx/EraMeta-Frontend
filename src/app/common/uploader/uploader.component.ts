import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { SnackService } from '../../service/snack.service';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {
  @Output() filesEmitter = new EventEmitter<File>();
  @Input() isUploadingImage: boolean = false;
  @ViewChild('dropZone') dropZone: ElementRef;

  isHovering: boolean

  constructor(private snackService: SnackService) { }

  ngOnInit() { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    if (files.length < 1) {
      this.snackService.showSnackBar('No image selected');
      return;
    } else if (files.length > 1) {
      this.snackService.showSnackBar('You cannot upload more than one image');
      return;
    }

    const dZone = this.dropZone.nativeElement as HTMLElement;

    let droppedFile: File = files.item(0)!;

    // Max file size : 25MB // Global Max
    if (droppedFile.size > 25000000) {
      this.snackService.showSnackBar("Your file is too big");
      return;
    }

    // @ts-ignore
    if (!((droppedFile.type === "image/png") || (droppedFile.type === "image/jpg") || (droppedFile.type === "image/jpeg") || (droppedFile.type === "image/gif"))) {
      this.snackService.showSnackBar("Only .png & .jpg files accepted");
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      dZone.style.backgroundImage = 'url(' + e.target?.result + ')';
      dZone.style.backgroundSize = 'cover';
    }
    reader.readAsDataURL(droppedFile);

    // @ts-ignore
    this.filesEmitter.emit(droppedFile)
  }
}
