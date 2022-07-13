import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {
  message: String;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data.message
  }

  ngOnInit(): void {
  }

}
