import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "../snack-bar/snack-bar.component";
import { REGEX_VALIDATOR } from "../constants"


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentYear: string = "2022";

  subscriptionForm: FormGroup;
  subscriptions: String[];
  isLoading: Boolean = false ;

  constructor(
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar) {
    this.subscriptionForm = this.fb.group({
      email: ['']
    });
  }

  ngOnInit(): void {
    this.currentYear = `${new Date().getFullYear()}`;
    // @ts-ignore
    this.getAllEmails("subscriptions/").subscribe((emails) => {
      // @ts-ignore
      this.subscriptions = emails.map(email => Object.values(email)[0].email);
    })
  }

  showSnackBar(message: String) {
    this.subscriptionForm.reset();
    this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 2000,
        data: {
          message: message
        }
    });
  }

  getAllEmails(path: String) {
    // @ts-ignore
    return this.db.list(path).valueChanges()
  }

  setLoading(isLoading: Boolean) {
    setTimeout(() => {
      this.isLoading = isLoading
    }, 1500)
  }

  subscribe() {
    var emailAddress = this.subscriptionForm.value.email;
    emailAddress = emailAddress.toLowerCase();

    if (emailAddress === null || !REGEX_VALIDATOR.test(emailAddress)) {
      this.showSnackBar("Please enter a valid email address");
      return;
    }

    this.pushSubscriptionsToFirebase(emailAddress);
  }

  pushSubscriptionsToFirebase(emailAddress: String) {
    this.isLoading = true
    let values = { "email" : emailAddress };
    const path = 'subscriptions/'
    const isRegistered = this.subscriptions.includes(emailAddress)

    const subsciptionRef = this.db.list((path) + Date.now() + "/")

    if(isRegistered) {
      this.setLoading(false)
      const errorMessage = "You were already subscribed";
      this.showSnackBar(errorMessage);
      return;
    }
    // TODO: Add date as key for ??? So when we fetch we can do a query for chronological order.

    subsciptionRef.push(values).then(
      (resp) => {
        this.setLoading(false)
        this.showSnackBar("Success!");
        return;
      }
    ).catch((error) => {
      this.setLoading(false)
      this.showSnackBar("Something bad happened when we tried to register you..");
      return;
    })
  }
}
