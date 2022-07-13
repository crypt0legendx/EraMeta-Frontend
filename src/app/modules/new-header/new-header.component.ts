import { trigger, style, animate, transition } from '@angular/animations';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { User } from '../../common/constants';

@Component({
  selector: 'app-new-header',
  animations: [
    trigger('enterAnimationLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('200ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('200ms', style({ transform: 'translateX(-100%)', opacity: 0 })),
      ]),
    ]),
    trigger('enterAnimationRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('200ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('200ms', style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
  ],
  templateUrl: './new-header.component.html',
  styleUrls: ['./new-header.component.css'],
})
export class NewHeaderComponent implements OnInit {
  @ViewChild('leftMenu') leftMenu: ElementRef;
  @ViewChild('rightMenu') rightMenu: ElementRef;
  @ViewChild('leftToggle') leftToggle: ElementRef;
  @ViewChild('rightToggle') rightToggle: ElementRef;

  iconifyScriptElement: HTMLScriptElement;

  loginForm: FormGroup;
  signupForm: FormGroup;

  authService: AuthService;
  isModalOpen: Boolean = false;
  isLoginForm: Boolean = false;

  leftMenuVisible: Boolean = false;
  rightMenuVisible: Boolean = false;

  currentUser?: User;

  constructor(
    authService: AuthService,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) {
    this.iconifyScriptElement = document.createElement('script');
    this.iconifyScriptElement.src =
      'https://code.iconify.design/2/2.0.4/iconify.min.js';
    document.body.appendChild(this.iconifyScriptElement);

    this.authService = authService;

    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
    this.signupForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
    });

    this.renderer.listen('window', 'mousedown', (e: Event) => {
      if (
        e.target !== this.leftMenu?.nativeElement &&
        e.target !== this.leftToggle?.nativeElement
      ) {
        this.leftMenuVisible = false;
      }
      if (
        e.target !== this.rightMenu?.nativeElement &&
        e.target !== this.rightToggle?.nativeElement
      ) {
        this.rightMenuVisible = false;
      }
    });
  }

  ngOnInit(): void {
    this.observeAuthState();
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  openBugReportsForm(): void {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSek8XgJGiB9OWZdRmpf6fnLcpkYVQzy6Ei4xKOvrNBosh8y2g/viewform?usp=sf_link'
    );
  }

  openModal(isLogin: boolean) {
    this.isModalOpen = true;
    this.isLoginForm = isLogin;
  }

  closeModal(e: MouseEvent) {
    let target = e.target as HTMLElement;

    if (target.id !== 'closeModal') {
      return;
    }
    this.observeAuthState();
    this.isModalOpen = false;
  }

  observeAuthState() {
    this.authService
      .observeAuthState()
      .then((_user) => {
        let user = _user as User;
        this.currentUser = user;
      })
      .catch((error) => {
        // TODO: add error handler
      });
  }

  toggleLeftMenu() {
    this.leftMenuVisible = !this.leftMenuVisible;
  }

  toggleRightMenu() {
    this.rightMenuVisible = !this.rightMenuVisible;
  }
}
