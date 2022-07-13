import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  updatePassword,
} from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { SnackBarComponent } from '../common/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../common/constants';
import { getDatabase, ref, set, onValue, update } from "firebase/database";

@Injectable()
export class AuthService {
  private auth;
  private database = getDatabase();

  constructor(auth: Auth, private _snackBar: MatSnackBar, private db: AngularFireDatabase) {
    this.auth = auth
  }

  // @ts-ignore
  createAccount(value){
    return new Promise<any>((resolve, reject) => {
      createUserWithEmailAndPassword(this.auth, value.email, value.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        set(ref(this.database, 'users/' + user.uid), {
          "uid": user.uid,
          "email": value.email,
          "username": value.username,
          "profileImageURL": "https://arweave.net/mbQ2gC81jCDhKzPk6X2Us-oxHIavkEDWP9jD9r6luqs?ext=png"
        }).then((user) => {
          this.fetchCurrentUser(userCredential.user.uid)
          .then(
            (user: User) => {
              resolve(user);
              this.showSnackBar("Congratulations on creating your account!")
            }
          ).catch((error) => {
          this.showSnackBar(this.getErrorMessageForCode(error.code));
          reject('Error signing up');
          })
        }).catch((error) => {
          this.showSnackBar(this.getErrorMessageForCode(error.code));
          reject('Error signing up');
        })
    }).catch((error) => {
        this.showSnackBar(this.getErrorMessageForCode(error.code));
        reject('Error signing up');
      });
    });
  }

  // @ts-ignore
  login(value){
    return new Promise<any>((resolve, reject) => {
      setPersistence(this.auth, browserLocalPersistence).then(() => {
        // New sign-in will be persisted with session persistence.
          signInWithEmailAndPassword(this.auth, value.email, value.password).then((userCredential) => {
            // Signed in
            this.fetchCurrentUser(userCredential.user.uid)
            .then((user: User) => {
              resolve(user);
              this.showSnackBar("Logged In!")
            }).catch((error) => {
              this.showSnackBar(this.getErrorMessageForCode(error.code));
              reject('Error logging in');
            })
          }).catch((error) => {
            reject('No user logged in');
            this.showSnackBar(this.getErrorMessageForCode(error.code));
          });
      }).catch((error) => {
        // Handle Errors here.
        reject('No user logged in');
        this.showSnackBar(this.getErrorMessageForCode(error.code));
      });
    });
  }

  logout(){
    return new Promise<any>((resolve, reject) => {
      signOut(this.auth).then(
        () => {
          resolve(true);
          this.showSnackBar("You have succcessfully logged out!");
        }
      ).catch((error) => {
        reject('No user logged in');
        this.showSnackBar("Error logging out, please try again");
      });
    });
  }

  showSnackBar(message: String) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: {
        message: message
      }
    });
  }

  observeAuthState() {
    return new Promise<any>((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.fetchCurrentUser(user.uid)
          .then(
            (user: User) => {
              resolve(user);
            }
          ).catch((error) => {
            this.showSnackBar(error.code);
          reject('Error signing up');
          })
        } else {
          reject("Error checking auth state");
        }
      });
    });
  }

  fetchCurrentUser(userID: string) {
    return new Promise<any>((resolve, reject) => {
      const usersRef = ref(this.database, 'users/' + userID);
      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        let user: User = data as User;
        if (user !== null) {
          resolve(user);
        } else {
          reject("Error fetching user")
        }
      });
    });
  }

  // @ts-ignore
  updateUserProfile(user: User, value) {
    return new Promise<any>((resolve, reject) => {
      update(ref(this.database, 'users/' + user.uid), value).then((_) => {
          resolve("success");
          this.showSnackBar("Your account has been upadated!");
      }).catch((error) => {
          this.showSnackBar(this.getErrorMessageForCode(error.code));
          reject('Error updating profile, please try again');
      })
    });
  }

  updateCurrentPassword(email: string, currentPassword: string, newPassword: string) {
    return new Promise<any>((resolve, reject) => {

      setPersistence(this.auth, browserLocalPersistence).then(() => {

          signInWithEmailAndPassword(this.auth, email, currentPassword).then(
            (_) => {
            updatePassword(this.auth.currentUser!, newPassword).then((_) => {
              this.showSnackBar("Successfully updated password");
              resolve("success");
            }).catch((error) => {
              this.showSnackBar(this.getErrorMessageForCode(error.code));
              reject("Error updating your password");
            });
          }).catch((error) => {
            reject('No user logged in');
            // this.showSnackBar("Error updating password, please try again");
            this.showSnackBar(this.getErrorMessageForCode(error.code));
            return;
          });

      }).catch((error) => {
        // Handle Errors here.
        reject("Error updating your password");
        this.showSnackBar(this.getErrorMessageForCode(error.code));
      });
    });
  }

  getErrorMessageForCode(code: String) {
    if ((code === 'auth/invalid-email') || code === 'auth/missing-email') {
      return "Please enter a valid email address";
    } else if (code === 'auth/internal-error') {
      return "Incorrect credentials, please try again";
    } else if (code === 'auth/wrong-password') {
      return "Incorrect password, please try again";
    } else if (code === 'auth/user-not-found') {
      return "No account linked to this email";
    } else if (code === 'auth/email-already-in-use') {
      return "There is already an account linked to this email";
    } else if (code === 'auth/weak-password') {
      return "Password must be at least 6 characters";
    } else if (code === 'auth/admin-restricted-operation') {
      return "Please enter your credentials";
    }
    return code;
  }
}
