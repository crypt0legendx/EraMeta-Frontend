import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

var multiplier = 1;

@Component({
  selector: 'app-paul-chenard',
  templateUrl: './paul-chenard.component.html',
  styleUrls: ['../../../css/drops.css', '../../../css/carouselSlider.css']
})
export class PaulChenardComponent implements OnInit {

  iconifyScriptElement: HTMLScriptElement;

  @ViewChild('liveSketchesCarousel') liveSketchesCarousel: ElementRef;
  @ViewChild('colorOnColorCarousel') colorOnColorCarousel: ElementRef;
  @ViewChild('penAndInkCarousel') penAndInkCarousel: ElementRef;
  @ViewChild('BWColorCarousel') BWColorCarousel: ElementRef;

  constructor(private db: AngularFireDatabase) {
    this.iconifyScriptElement = document.createElement("script");
    this.iconifyScriptElement.src = "https://code.iconify.design/2/2.0.4/iconify.min.js";
    document.body.appendChild(this.iconifyScriptElement);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setupCarousels();
  }

  getimages(path: String) {
    // @ts-ignore
    return this.db.list(path).valueChanges()
  }

  setupCarousels() {
    let liveSketchesPath = "images/PCDropItems/liveSketches"
    let colorOnColorPath = "images/PCDropItems/colorOnColor"
    let penAndInkPath = "images/PCDropItems/penAndInk"
    let bwColorPath = "images/PCDropItems/bwColor"

    this.getimages(liveSketchesPath).subscribe(
      (images) => {
        for (var i = 0; i < images.length; i++) {
          this.liveSketchesCarousel.nativeElement.insertAdjacentHTML(
            "beforeend",
            // @ts-ignore
            '<img #image' + i + ' class="image' + i + ' sliderImage" src="' + images[i].downloadURL + ''  + '"' + "></img>"
          )

          let image = document.body.querySelector(".image" + i + "") as HTMLElement;
          image.style.height = "225px";
          image.style.borderRadius = "5px";
          image.style.backgroundSize = "cover";
          image.style.margin = "5px 8px";
          image.style.cursor = "pointer";
          image.style.transition = "0.5s ease";
          image.addEventListener("click", this.presentLightBoxImage);
        }
      }
    )

    this.getimages(colorOnColorPath).subscribe((images) => {
      for (var i = 0; i < images.length; i++) {
        this.colorOnColorCarousel.nativeElement.insertAdjacentHTML(
          "beforeend",
          // @ts-ignore
          '<img #cOnC' + i + ' class="cOnC' + i + ' sliderImage" src="' + images[i].downloadURL + ''  + '"' + "></img>"
        )

        let image = document.body.querySelector(".cOnC" + i + "") as HTMLElement;
        image.style.height = "225px";
        image.style.borderRadius = "5px";
        image.style.backgroundSize = "cover";
        image.style.margin = "5px 8px";
        image.style.cursor = "pointer";
        image.style.transition = "0.5s ease";
        image.addEventListener("click", this.presentLightBoxImage);
      }
    })

    this.getimages(penAndInkPath).subscribe((images) => {
      for (var i = 0; i < images.length; i++) {
        this.penAndInkCarousel.nativeElement.insertAdjacentHTML(
          "beforeend",
          // @ts-ignore
        '<img #penAndInk' + i + ' class="penAndInk' + i + ' sliderImage" src="' + images[i].downloadURL + ''  + '"' + "></img>"
        )

        let image = document.body.querySelector(".penAndInk" + i + "") as HTMLElement;
        image.style.height = "225px";
        image.style.borderRadius = "5px";
        image.style.backgroundSize = "cover";
        image.style.margin = "5px 8px";
        image.style.cursor = "pointer";
        image.style.transition = "0.5s ease";
        image.addEventListener("click", this.presentLightBoxImage);
      }
    })

    this.getimages(bwColorPath).subscribe((images) => {
      for (var i = 0; i < images.length; i++) {
        this.BWColorCarousel.nativeElement.insertAdjacentHTML(
          "beforeend",
          // @ts-ignore
        '<img #BWColor' + i + ' class="BWColor' + i + ' sliderImage" src="' + images[i].downloadURL + ''  + '"' + "></img>"
        )

        let image = document.body.querySelector(".BWColor" + i + "") as HTMLElement;
        image.style.height = "225px";
        image.style.borderRadius = "5px";
        image.style.backgroundSize = "cover";
        image.style.margin = "5px 8px";
        image.style.cursor = "pointer";
        image.style.transition = "0.5s ease";
        image.addEventListener("click", this.presentLightBoxImage);
      }
    })
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

  sliderScrollLeft(forCarousel: String) {
    var selectedCarousel = this.liveSketchesCarousel;

    if (forCarousel === "liveSketches") {
      selectedCarousel = this.liveSketchesCarousel;
    } else if (forCarousel === "colorOnColor") {
      selectedCarousel = this.colorOnColorCarousel;
    } else if (forCarousel === "penAndInk") {
      selectedCarousel = this.penAndInkCarousel;
    } else if (forCarousel === "BWColor") {
      selectedCarousel = this.BWColorCarousel;
    }

    if (selectedCarousel === null) { return; }

    selectedCarousel.nativeElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });

    multiplier = 1;
  }

  sliderScrollRight(forCarousel: String) {
    var selectedCarousel = this.liveSketchesCarousel;

    if (forCarousel === "liveSketches") {
      selectedCarousel = this.liveSketchesCarousel;
    } else if (forCarousel === "colorOnColor") {
      selectedCarousel = this.colorOnColorCarousel;
    } else if (forCarousel === "penAndInk") {
      selectedCarousel = this.penAndInkCarousel;
    } else if (forCarousel === "BWColor") {
      selectedCarousel = this.BWColorCarousel;
    } else {
      return;
    }

    if (selectedCarousel === null) { return; }

    while ((selectedCarousel.nativeElement.clientWidth * multiplier) <= (selectedCarousel.nativeElement.scrollLeft + 400)) {
      multiplier++;
      //LOL just gotta be safe
      if (multiplier > 99) {
        console.log("BREAK");
        return;
      }
    }

    selectedCarousel.nativeElement.scrollTo({
      top: 0,
      left: selectedCarousel.nativeElement.clientWidth * multiplier,
      behavior: "smooth"
    });
    multiplier++;
  }
}
