import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";

let lightBox = document.createElement('div');
lightBox.addEventListener('click', e => {
  if (e.target !== e.currentTarget) {
    return;
  };
  lightBox.style.display = "none";
});
lightBox.style.textAlign = "center";
lightBox.style.position = "fixed";
lightBox.style.zIndex = "1000000";
lightBox.style.top = "0";
lightBox.style.bottom = "0";
lightBox.style.left = "0";
lightBox.style.right = "0";
lightBox.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
lightBox.style.justifyContent = "center";
lightBox.style.alignItems = "center";
lightBox.style.display = "none";

let lightBoxImage = document.createElement('img');
lightBoxImage.style.justifyContent = "center";
lightBoxImage.style.textAlign = "center";
lightBoxImage.style.maxWidth = "80%";
lightBoxImage.style.maxHeight = "75%";
lightBoxImage.style.borderRadius = "5px";

class Image {
  src: String;
  name: String;
  rarity: String;
  price: String;
}

@Component({
  selector: 'app-suicide-gang',
  templateUrl: './suicide-gang.component.html',
  styleUrls: ['../../../css/drops.css']
})
export class SuicideGangComponent implements OnInit {

  iconifyScriptElement: HTMLScriptElement;
  images: Image[];

  @ViewChild('gangPlanLB') gangPlanLB: ElementRef;
  @ViewChild('dropSubTitle') dropSubTitle: ElementRef;
  @ViewChild('toggleButtonText') toggleButtonText: ElementRef;
  @ViewChild('toggleButton') toggleButton: ElementRef;


  constructor(private db: AngularFireDatabase) {
    this.iconifyScriptElement = document.createElement("script");
    this.iconifyScriptElement.src = "https://code.iconify.design/2/2.0.4/iconify.min.js";
    document.body.appendChild(this.iconifyScriptElement);
  }

  ngOnInit(): void {
    this.getImages().subscribe((images) => {
      let x = images
      x = x.map((item, index) => ({
          // @ts-ignore
          src: item.downloadURL,
          name: index > 9 ? `#SG00${index}` : `#SG000${index}`,
          rarity: "1/1/5,555",
          price: "TBA"
      }))
      // @ts-ignore
      this.images = x
    })
  }

  getImages() {
    return this.db.list("images/SGPreRevealItems").valueChanges()
  }

  presentLightBoxImage(e: MouseEvent) {
    if (e.target !== e.currentTarget) {
      return;
    }

    let selectedImage = e.currentTarget as HTMLImageElement;

    document.body.appendChild(lightBox);
    lightBox.style.display = "flex";
    lightBoxImage.src = selectedImage.src;
    lightBox.appendChild(lightBoxImage);
  }

  hideRoadMap(e: MouseEvent) {
    if (e.target !== e.currentTarget) {
      return;
    }
    this.gangPlanLB.nativeElement.classList.remove('active');
  }

  openRoadMap() {
    this.gangPlanLB.nativeElement.classList.add('active');
  }

  togglePlans() {
      if (this.toggleButton.nativeElement.id === '0') {
        this.dropSubTitle.nativeElement.style.maxHeight = 'none';
        this.toggleButton.nativeElement.id = '1';
        this.toggleButtonText.nativeElement.innerHTML= "Less";
      } else {
        this.dropSubTitle.nativeElement.style.maxHeight = '44px';
        this.toggleButton.nativeElement.id = '0';
        this.toggleButtonText.nativeElement.innerHTML = "More";
      }
  }
}
