import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { User } from '../constants';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {
  @Input() isModalOpen: Boolean;
  @Input() isLoginForm: Boolean;
  @Output() closeEvent = new EventEmitter<MouseEvent>();
  @Output() currentUser = new EventEmitter<User>();

  iconifyScriptElement: HTMLScriptElement;

  loginForm: FormGroup;
  signupForm: FormGroup;

  authService: AuthService;
  isBuffering: Boolean = false;

  constructor(authService: AuthService, private fb: FormBuilder) {
    this.iconifyScriptElement = document.createElement("script");
    this.iconifyScriptElement.src = "https://code.iconify.design/2/2.0.4/iconify.min.js";
    document.body.appendChild(this.iconifyScriptElement);

    this.authService = authService;

    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
    this.signupForm = this.fb.group({
      username: [''],
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  closeModal(e: MouseEvent) {
    this.closeEvent.emit(e)
  }

  changeModal(e: MouseEvent) {
    if (e.target !== e.currentTarget) {
      return;
    }

    this.isLoginForm = !this.isLoginForm;

    this.loginForm.reset();
    this.signupForm.reset();
  }

  login() {
    let loginEmail: String = this.loginForm.value.email;
    let loginPassword: String = this.loginForm.value.password;

    this.isBuffering = true;

    this.authService.login({email: loginEmail, password: loginPassword})
      .then(
        (_user: User) => {
          this.currentUser.emit(_user)
          this.isModalOpen = false;
          this.isBuffering = false;
          this.loginForm.reset();
        }
    ).catch((error) => {
      this.isBuffering = false;
      this.loginForm.reset();
    });
  }

  signup() {
    let username: String = this.signupForm.value.username;
    let signupEmail: String = this.signupForm.value.email;
    let signupPassword: String = this.signupForm.value.password;

    this.isBuffering = true;

    this.authService.createAccount({email: signupEmail, password: signupPassword, username: username}).then(
      (user: User) => {
        this.currentUser.emit(user)
        this.isModalOpen = false;
        this.isBuffering = false;
        this.signupForm.reset();
      }
    ).catch((error) => {
      this.isBuffering = false;
      this.signupForm.reset();
    });
  }

}
