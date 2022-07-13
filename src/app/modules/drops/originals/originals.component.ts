import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackService } from 'src/app/service/snack.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { EraMetaOriginalCollection,
  ERAMETA_ORIGINALS_COLLECTIONS
  // DEFAULT_PROFILE_IMAGE_URL
} from 'src/app/common/constants';

@Component({
  selector: 'app-originals',
  templateUrl: './originals.component.html',
  styleUrls: ['./originals.component.css']
})
export class OriginalsComponent implements OnInit {

  selectedCollection: EraMetaOriginalCollection | null = null;
  // placeholderImageURL: string = DEFAULT_PROFILE_IMAGE_URL;

  constructor(private route: ActivatedRoute,
    private snackService: SnackService,
    private router: Router,
    private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let selectedCollection: EraMetaOriginalCollection = ERAMETA_ORIGINALS_COLLECTIONS.get(params['collectionId']) as EraMetaOriginalCollection;
      if (!selectedCollection) {
        this.abortPage();
      }
      this.selectedCollection = selectedCollection;
      this.fetchArt(this.selectedCollection.pathsToArt);
    });
  }

  artDownloadURLs: Map<string, string[]> = new Map();
  didFetchArt: boolean = false;
  fetchArt(artPaths: Map<string, string> | undefined) {
    if (!artPaths) {
      this.didFetchArt = true;
      return;
    }

    let count = 0;
    artPaths.forEach((value, key) => {
      this.getImages(value).subscribe(
        (images) => {
          let downloadURLs: string[] = [];
          for (var i = 0; i < images.length; i++) {
            if (!images[i]) {
              continue;
            }
            // @ts-ignore
            downloadURLs.push(images[i].downloadURL);
          }

          this.artDownloadURLs.set(key, downloadURLs);
          count++;

          // Only true when complete
          // this.didFetchArt = (count >= artPaths.size);
          if (count === artPaths.size) {
            this.didFetchArt = true;
          }
        }
      )
    })
  }

  getImages(path: string) {
    return this.db.list(path).valueChanges();
  }

  abortPage() {
    this.snackService.showSnackBar("Oops.. Collection could not be found");
    this.router.navigate(['collections']);
  }

  openWebsite() {
    if (!this.selectedCollection) {
      this.abortPage();
      return;
    }

    window.open(this.selectedCollection.websiteURL);
  }

  openTwitter() {
    if (!this.selectedCollection) {
      this.abortPage();
      return;
    }

    window.open(this.selectedCollection.twitterURL);
  }

  openDiscord() {
    if (!this.selectedCollection) {
      this.abortPage();
      return;
    }

    if (!this.selectedCollection.discordURL) {
      this.snackService.showSnackBar("No Discord has been linked yet!");
      return;
    }

    window.open(this.selectedCollection.discordURL);
  }

  openAnalystReport() {
    if (!this.selectedCollection) {
      this.abortPage();
      return;
    }

    if (!this.selectedCollection.analystReportURL) {
      this.snackService.showSnackBar("The " + this.selectedCollection.collectionTitle + " analyst report will be released shortly");
      return;
    }

    window.open(this.selectedCollection.analystReportURL);
  }

  getDisplayablePriceTag() {
    if (!this.selectedCollection) {
      this.abortPage();
      return;
    }

    if (this.selectedCollection.isAuction) {
      return "AUCTION";
    }

    return this.selectedCollection.publicSalePrice ? this.selectedCollection.publicSalePrice + " ◎" : "TBA";
  }

  selectedImageURL: string;
  openImageLightbox(imageURL: string) {
    this.selectedImageURL = imageURL;
    this.isLightBoxOpen = true;
  }

  isLightBoxOpen: boolean = false;
  closeImageLightbox(e: MouseEvent) {
    let target = e.target as HTMLElement;
    if (target.id !== "closeModal") {
      return;
    }
    this.isLightBoxOpen = false;
  }
}
