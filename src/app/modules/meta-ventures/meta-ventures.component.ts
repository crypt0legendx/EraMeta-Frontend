import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SnackService } from 'src/app/service/snack.service';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';

@Component({
  selector: 'app-meta-ventures',
  templateUrl: './meta-ventures.component.html',
  styleUrls: ['./meta-ventures.component.css']
})
export class MetaVenturesComponent implements OnInit {

  stepperOrientation: StepperOrientation = "horizontal" as StepperOrientation;

  constructor(private snackServive: SnackService) { }

  ngOnInit(): void {
    this.stepperOrientation = (window.innerWidth <= 768) ? "vertical" : "horizontal";
  }

  openApplicationForm() {
    this.snackServive.showSnackBar("Applications are currently closed.");
  }

  visitSandboxEstate() {
    window.open("https://www.sandbox.game/en/map/?liteMap=true&currentX=367&currentY=1092&zoom=1&x=-99&y=-49");
  }

  watchVideo() {
    window.open("https://www.youtube.com/watch?v=WD38OueA5zk");
  }

  learnAboutNFTs() {
    window.open("https://solana.com/developers/nfts");
  }

  learnAboutDAOs() {
    window.open("https://solana.com/developers/dao");
  }

  onMatStepperToggle(stepper: MatStepper) {
    // Need timeout so matstepper can toggle before reading selectedIndex.
    // If no timeout selectedIndex returns index before toggle happens.
    setTimeout(() => {
      this.setupMatStepperheader(stepper.selectedIndex);
    }, 0.9)
  }

  @ViewChild('stepperTitle1') stepperTitle1: ElementRef;
  @ViewChild('stepperTitle2') stepperTitle2: ElementRef;
  @ViewChild('stepperTitle3') stepperTitle3: ElementRef;
  @ViewChild('stepperTitle4') stepperTitle4: ElementRef;
  setupMatStepperheader(selected: number) {
    this.stepperTitle1.nativeElement.style.textDecoration = "none";
    this.stepperTitle1.nativeElement.style.fontWeight = "400";

    this.stepperTitle2.nativeElement.style.textDecoration = "none";
    this.stepperTitle2.nativeElement.style.fontWeight = "400";

    this.stepperTitle3.nativeElement.style.textDecoration = "none";
    this.stepperTitle3.nativeElement.style.fontWeight = "400";

    this.stepperTitle4.nativeElement.style.textDecoration = "none";
    this.stepperTitle4.nativeElement.style.fontWeight = "400";

    if (selected === 0) {
      this.stepperTitle1.nativeElement.style.textDecoration = "underline";
      this.stepperTitle1.nativeElement.style.fontWeight = "550";
    }
    if (selected === 1) {
      this.stepperTitle2.nativeElement.style.textDecoration = "underline";
      this.stepperTitle2.nativeElement.style.fontWeight = "550";
    }
    if (selected === 2) {
      this.stepperTitle3.nativeElement.style.textDecoration = "underline";
      this.stepperTitle3.nativeElement.style.fontWeight = "550";
    }
    if (selected === 3) {
      this.stepperTitle4.nativeElement.style.textDecoration = "underline";
      this.stepperTitle4.nativeElement.style.fontWeight = "550";
      this.snackServive.showSnackBar("Information coming soon!");
    }
  }

  learnMoreAboutProject() {
    this.snackServive.showSnackBar("Information will soon be released to public");
  }
}
