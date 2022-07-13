import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable()
export class UserService {
  private auth: Auth;
  constructor(auth: Auth) {
    this.auth = auth
  }

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  // @ts-ignore
  updateCurrentUser(value){
  }


}
