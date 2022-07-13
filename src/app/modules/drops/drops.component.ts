import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

class Collection {
  profileImage: String;
  title: String;
  description: String;
  websiteURL: String;
  twitterURL: String;
}

@Component({
  selector: 'app-drops',
  templateUrl: './drops.component.html',
  styleUrls: ['./drops.component.css']
})

export class DropsComponent implements OnInit {

  allOriginalCollections: Collection[] = [
    {
      profileImage: "https://firebasestorage.googleapis.com/v0/b/truenfts.appspot.com/o/Manual_Input%2FEraMeta-Gold-Key.gif?alt=media&token=af4c6c8f-3bcf-46e3-a5f1-9a1b87bd2460",
      title: "EraMeta DAO",
      description: "Ultimate revenue sharing NFT and DAO membership pass.",
      websiteURL: "https://erameta.io/home",
      twitterURL: "https://twitter.com/EraMetaDao"
    },
    {
      profileImage: "../../../assets/videos/liveSketches.gif",
      title: "Automobili Art",
      description: "Maritime Motosports Hall of Fame inductee & the world's most published automotive artist.",
      websiteURL: "https://erameta.io/home",
      twitterURL: "https://twitter.com/Automobiliart"
    },
    {
      profileImage: "../../../assets/videos/glitchmag.gif",
      title: "GLITCH Magazine",
      description: "A niche hybrid magazine for the digital natives and print enthusiasts, driven by fashion, technology and new talent.",
      websiteURL: "https://linktr.ee/officialglitchmag",
      twitterURL: "https://twitter.com/offglitchmag"
    }
  ];
  oneOfOneCollections: Collection[] = [this.allOriginalCollections[1]]

  constructor(private router: Router) { }

  ngOnInit(): void { }

  openOriginalsCollection(param: String) {
    this.router.navigate([`collections/originals/${param}`]);
  }
}
