import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "../common/snack-bar/snack-bar.component";

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  constructor(private _snackBar: MatSnackBar) { }

  showSnackBar(message: String) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: {
        message: message
      }
    });
  }
}
