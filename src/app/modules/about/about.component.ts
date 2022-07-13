import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../common/dialog/dialog.component";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {

  aboutScriptElement: HTMLScriptElement;
  iconifyScriptElement: HTMLScriptElement;

  constructor(public dialog: MatDialog) {
    this.iconifyScriptElement = document.createElement("script");
    this.iconifyScriptElement.src = "https://code.iconify.design/2/2.0.4/iconify.min.js";
    document.body.appendChild(this.iconifyScriptElement);

    this.aboutScriptElement = document.createElement("script");
    this.aboutScriptElement.src = "../../assets/js/about.js";
    document.head.appendChild(this.aboutScriptElement);
  }

  ngOnInit(): void {
  }

  openWhitePaper(): void {
    window.open("https://www.canva.com/design/DAE_HZCdYag/LuZ7NDgMx1O6aRcnDaHxCA/view?utm_content=DAE_HZCdYag&utm_campaign=share_your_design&utm_medium=link&utm_source=shareyourdesignpanel");
  }
}
