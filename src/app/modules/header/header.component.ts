import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import {AuthService} from '../../service/auth.service';
import { User } from '../../common/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css' ]
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  iconifyScriptElement: HTMLScriptElement;

  loginForm: FormGroup;
  signupForm: FormGroup;

  authService: AuthService;
  isModalOpen: Boolean = false;
  isLoginForm: Boolean = false;

  currentUser?: User;

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
    this.observeAuthState();
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  // openApplicationsForm(): void {
  //   window.open('https://docs.google.com/forms/d/e/1FAIpQLSe2oHuNSECwZrZ6XG17WpGFcw6SRTexgOiXeaAgia4nrV5Ifw/viewform');
  // }

  openBugReportsForm(): void {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSek8XgJGiB9OWZdRmpf6fnLcpkYVQzy6Ei4xKOvrNBosh8y2g/viewform?usp=sf_link');
  }

  openModal(isLogin: boolean) {
    this.isModalOpen = true;
    this.isLoginForm = isLogin
  }

  closeModal(e: MouseEvent) {
    let target = e.target as HTMLElement;

    if (target.id !== "closeModal") {
      return;
    }
    this.observeAuthState()
    this.isModalOpen = false;
  }

  observeAuthState() {
    this.authService.observeAuthState().then(
      (_user) => {
        let user = _user as User;
        this.currentUser = user;
      }
    ).catch((error) => {
      // TODO: add error handler
    });
  }
}
