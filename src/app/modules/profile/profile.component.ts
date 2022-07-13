import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {PROFILE_IMAGES_FOLDER_PATH, User, USER_DB_PATH} from '../../common/constants';
import {UploaderService} from '../../service/uploader.service';
import {SnackService} from '../../service/snack.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './edit-profile.css']
})
export class ProfileComponent implements OnInit {

  iconifyScriptElement: HTMLScriptElement;

  authService: AuthService;
  currentUser?: User;
  nameTag: String = "";

  isLoading: boolean = false;
  isOnEditProfilePage: boolean = false;
  isChangingPassword: boolean  = false;
  isEditingProfileImage: boolean = false;

  editProfileForm: FormGroup;
  changePasswordForm: FormGroup;
  toggleFormButtonValue: string = 'Change password';
  isUploadingImage: boolean = false;
  isBuffering: boolean = false;
  file: File | null;

  @ViewChild('toggle1') collectionsFilterBTN: ElementRef;
  @ViewChild('toggle2') originalsFilterBTN: ElementRef;
  @ViewChild('toggle3') historyFilterBTN: ElementRef;
  @ViewChild('noResultsText') noResultsText: ElementRef;

  constructor(authService: AuthService, private fb: FormBuilder, private fileUploader: UploaderService, private snackService: SnackService) {
    this.iconifyScriptElement = document.createElement("script");
    this.iconifyScriptElement.src = "https://code.iconify.design/2/2.0.4/iconify.min.js";
    document.body.appendChild(this.iconifyScriptElement);

    this.authService = authService;

    this.editProfileForm = this.fb.group({
      username: [''],
      firstName: [''],
      lastName: ['']
    });
    this.changePasswordForm = this.fb.group({
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });
  }

  ngOnInit(): void {
    this.observeAuthState();
  }

  setFile(file: File) {
    this.file = file
  }

  observeAuthState() {
    this.authService.observeAuthState().then(
      (_user) => {
        let user = _user as User;
        this.currentUser = user;

        this.nameTag = (user.firstName && user.lastName) ? user.firstName! + " " + user.lastName! : user.username;
      }
    ).catch((error) => {
      console.log(error);
    });
  }

  logout() {
    this.authService.logout().then(
      (logout) => {
        if (logout) {
          this.currentUser = undefined;
          window.open("https://erameta.io/home", "_self");
        } else {
          return
        }
      }
    ).catch((error) => {
      // .. Do what here?
    });
  }

  toggleFilterSection(e: MouseEvent) {
    if (e.target !== e.currentTarget) { return; }

    this.startLoading();

    let selectedFilter = e.currentTarget as HTMLDivElement;
    let filterId = selectedFilter.id as String;

    let collectionsFilter = this.collectionsFilterBTN.nativeElement as HTMLDivElement;
    let originalsFilter = this.originalsFilterBTN.nativeElement as HTMLDivElement;
    let historyFilter = this.historyFilterBTN.nativeElement as HTMLDivElement;

    var filterElement: HTMLDivElement = collectionsFilter;

    if (filterId === 'toggle1') {
      filterElement = collectionsFilter;
    } else if (filterId === 'toggle2') {
      filterElement = originalsFilter;
    } else if (filterId === 'toggle3') {
      filterElement = historyFilter;
    }

    collectionsFilter.style.color = 'rgba(255, 255, 255, 1)';
    collectionsFilter.style.borderBottom = '1px solid rgba(255, 255, 255, 1)';

    originalsFilter.style.color = 'rgba(255, 255, 255, 1)';
    originalsFilter.style.borderBottom = '1px solid rgba(255, 255, 255, 1)';

    historyFilter.style.color = 'rgba(255, 255, 255, 1)';
    historyFilter.style.borderBottom = '1px solid rgba(255, 255, 255, 1)';

    filterElement.style.color = '#18FB9A';
    filterElement.style.borderBottom = '1px solid #18FB9A';
    this.stopLoading();
  }

  toggleProfileModal(bool: boolean) {
    this.isOnEditProfilePage = bool;
    this.noResultsText.nativeElement.style.display = (bool ? 'none' : 'block');
    this.editProfileForm.reset();
    this.changePasswordForm.reset();
    this.file = null;
  }

  toggleForm(bool: boolean) { // bool === true ? show change password form : show edit profile form \\
    this.isChangingPassword = bool;
    this.toggleFormButtonValue = (bool ? 'Edit profile' : 'Change password');
    this.editProfileForm.reset();
    this.changePasswordForm.reset();
  }

  updateProfile() {
    if (this.isBuffering || !this.currentUser) {
      return;
    }

    this.isBuffering = true;

    if ((this.editProfileForm.value.username === "" || this.editProfileForm.value.username === null) && (this.editProfileForm.value.firstName === "" || this.editProfileForm.value.firstName === null) && (this.editProfileForm.value.lastName === "" || this.editProfileForm.value.lastName === null)) {
      this.isBuffering = false;
      return;
    }

    // Check to see if updated values are different than currentUser
    if ((this.editProfileForm.value.username === this.currentUser?.username) && (this.editProfileForm.value.firstName === (this.currentUser?.firstName ? this.currentUser?.firstName : null)) && (this.editProfileForm.value.lastName === (this.currentUser?.lastName ? this.currentUser?.lastName : null))) {
      this.isBuffering = false;
      this.authService.showSnackBar("Please enter updated information");
      return;
    }

    let value = {
      username: (!this.editProfileForm.value.username) ? this.currentUser.username : this.editProfileForm.value.username,
      firstName: (!this.editProfileForm.value.firstName) ? this.currentUser.firstName : this.editProfileForm.value.firstName,
      lastName: (!this.editProfileForm.value.lastName) ? this.currentUser.lastName : this.editProfileForm.value.lastName
    }

    this.authService.updateUserProfile(this.currentUser!, value).then(
      (_) => {

        this.observeAuthState();
        this.isBuffering = false;
        this.toggleProfileModal(false);

    }).catch((_: any) => {
        this.isBuffering = false;
        this.editProfileForm.reset();
    })
  }

  updatePassword() {
    if (this.isBuffering || !this.currentUser) {
      return;
    }

    this.isBuffering = true;

    // All forms must be filled out
    if ((this.changePasswordForm.value.currentPassword === "" || this.changePasswordForm.value.currentPassword === null) || (this.changePasswordForm.value.newPassword === "" || this.changePasswordForm.value.newPassword === null) || (this.changePasswordForm.value.confirmPassword === "" || this.changePasswordForm.value.confirmPassword === null)) {
      this.isBuffering = false;
      return;
    }

    if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmPassword) {
      this.isBuffering = false;
      this.authService.showSnackBar("New passwords do not match");
      return;
    }

    if (this.changePasswordForm.value.newPassword.length < 6) {
      this.isBuffering = false;
      this.authService.showSnackBar("Password must be at least 6 characters long");
      return;
    }

    this.authService.updateCurrentPassword((this.currentUser!.email as string || "_"), this.changePasswordForm.value.currentPassword, this.changePasswordForm.value.newPassword).then(
      (_: any) => {
        this.isBuffering = false;
        this.toggleProfileModal(false);
      }).catch((_: any) => {
        this.isBuffering = false;
        this.changePasswordForm.reset();
      })
    };

  uploadProfileImage() {
    if (!this.file) {
      this.snackService.showSnackBar('Please upload a proper file');
      return
    }

    let droppedFile = this.file;

    // Max file size : 2MB // Global Max is 25 MB
    if (droppedFile.size > 2000000) {
      this.snackService.showSnackBar("Your file is too big");
      return;
    }

    // No Gifs or Videos for profile image
    // @ts-ignore
    if (!((droppedFile.type === "image/png") || (droppedFile.type === "image/jpg") || (droppedFile.type === "image/jpeg"))) {
      this.snackService.showSnackBar("Only .png & .jpg files accepted");
      return;
    }

    this.isUploadingImage = true

    // @ts-ignore
    this.fileUploader.startUploadProfileImage(PROFILE_IMAGES_FOLDER_PATH  + this.currentUser.uid, this.file, USER_DB_PATH + this.currentUser.uid, 'profileImageURL')
        .then(() => {
          this.isUploadingImage = false;
          this.toggleProfileModal(false);
          this.observeAuthState();
        })
        .catch(() => {
          this.isUploadingImage = false;
        })
  }

  toggleEditProfileImage(e: MouseEvent) {
    if (e.target !== e.currentTarget) {
      return;
    }
    if (!this.currentUser) {
      return;
    }

    this.isEditingProfileImage = !this.isEditingProfileImage;

    if (!this.isEditingProfileImage) {
      this.file = null;
    }
  }

  startLoading() {
    this.isLoading = true;
    this.noResultsText.nativeElement.style.display = 'none';
  }

  stopLoading() {
    let interval = setInterval(() => {
      clearInterval(interval);
      this.isLoading = false;
      this.noResultsText.nativeElement.style.display = 'block';
    }, 750)
  }
}
