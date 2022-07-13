import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/common/constants';
import { SnackService } from 'src/app/service/snack.service';
import { googleFormLink } from './constants';

@Component({
  selector: 'app-contact',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.css']
})

export class LaunchpadComponent implements OnInit {

  iconifyScriptElement: HTMLScriptElement

  isAuthModalOpen: boolean = false;

  constructor(public auth: Auth,
    private snackServive: SnackService,
    private router: Router) {
    this.iconifyScriptElement = document.createElement("script");
    this.iconifyScriptElement.src = "https://code.iconify.design/2/2.0.4/iconify.min.js";
    document.body.appendChild(this.iconifyScriptElement);
  }

  ngOnInit(): void { }

  openModal(isLogin: boolean) {
    this.isAuthModalOpen = true;
  }

  closeModal(e: MouseEvent) {
    let target = e.target as HTMLElement;

    if (target.id !== "closeModal") {
      return;
    }

    this.isAuthModalOpen = false;
  }

  verifyCreationStatus() {
    let currentUserId = this.auth.currentUser?.uid;

    if (currentUserId) {
      this.router.navigate(['dashboard']);
      return;
    }

    this.isAuthModalOpen = true;
  }

  onAuthenticateUser(user: User) {
    this.router.navigate(['dashboard']).then((_) => {
      // Reload to toggle header
      window.location.reload();
    })
  }
}
