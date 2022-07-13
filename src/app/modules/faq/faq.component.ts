import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../common/snack-bar/snack-bar.component';
import { RecaptchaComponent } from 'ng-recaptcha';
import { REGEX_VALIDATOR } from '../../common/constants';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css', '../../css/accordionFAQ.css']
})
export class FaqComponent implements OnInit {

  iconifyScriptElement: HTMLScriptElement;
  emailForm: FormGroup;
  isLoading: Boolean = false  ;
  // @ViewChild('recaptcha') recaptcha: RecaptchaComponent;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private db: AngularFireDatabase) {
    this.emailForm = this.fb.group({
      email: [''],
      subject: [''],
      message: ['']
    });

    this.iconifyScriptElement = document.createElement("script");
    this.iconifyScriptElement.src = "https://code.iconify.design/2/2.0.4/iconify.min.js";
    document.body.appendChild(this.iconifyScriptElement);
  }

  ngOnInit(): void {
  }

  toggleAccordion(e: MouseEvent) {
    if (e.target !== e.currentTarget) {
      return;
    }

    let button = e.target as HTMLElement;
    button.classList.toggle('active');
    let buttonSibling = button.nextElementSibling as HTMLElement;
    buttonSibling.classList.toggle('active');
  }

  // myRecaptcha = false

  showSnackBar(message: String) {
    this.emailForm.reset();
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: {
        message: message
      }
    });
  }

  // resolved() {
  //   this.myRecaptcha = true
  // }

  // resetCaptcha() {
  //   this.recaptcha.reset()
  //   this.myRecaptcha = false;
  // }

  sendEmail() {
    let email = this.emailForm.value.email;
    let subject = this.emailForm.value.subject;
    let message = this.emailForm.value.message;

    if (email === null || !REGEX_VALIDATOR.test(email)) {
      this.showSnackBar("Please enter a valid email address");
      return;
    }

    if (subject === null || subject === "") {
      this.showSnackBar("Subject must be at least 1 character long")
      return;
    }
    if (message === null || message === "") {
      this.showSnackBar("Message must be at least 1 character long")
      return;
    }
    this.sendEmailToFirebase();
  }

  sendEmailToFirebase() {
    this.isLoading = true
    const ref = this.db.list('emails/' + Date.now() + "/")
    ref.push({
      "email": this.emailForm.value.email,
      "subject": this.emailForm.value.subject,
      "message": this.emailForm.value.message
    }).then(() => {
        this.setLoading(false)
        this.showSnackBar("Success");
      }).catch(() => {
        this.setLoading(false)
        this.showSnackBar("Something bad happened when we tried to send your email")
    })
  }

  setLoading(isLoading: Boolean) {
    setTimeout(() => {
      this.isLoading = isLoading
    }, 1500)
  }
}
