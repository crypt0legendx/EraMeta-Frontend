import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-lightbox',
  templateUrl: './image-lightbox.component.html',
  styleUrls: ['./image-lightbox.component.css']
})
export class ImageLightboxComponent implements OnInit {

  @Input() selectedImageURL: string;
  @Output() closeEvent = new EventEmitter<MouseEvent>()

  constructor() { }

  ngOnInit(): void { }

  closeModal(e: MouseEvent) {
    let target = e.target as HTMLElement;
    if (target.id !== "closeModal") {
      return;
    }

    this.closeEvent.emit(e);
  }
}
