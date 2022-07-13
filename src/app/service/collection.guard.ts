import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
import { SnackService } from './snack.service';
import { getDatabase, ref, onValue } from "firebase/database";
import { Collection } from '../common/constants';
import { Auth } from '@angular/fire/auth';
import { User } from '../common/constants';


@Injectable()
export class CollectionGuard implements CanActivate {
    
  private database = getDatabase();

  constructor(
    public userService: UserService,
    private router: Router,
    private snackService: SnackService,
    private auth: Auth
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
    this.userService.getCurrentUser().then((user) => {
        const collectionsRef = ref(this.database, 'collections/' + user.uid);
        onValue(collectionsRef, (snapshot) => {
          const data = snapshot.val() as [string : Collection];

          if (!data || (Object.entries(data).length < 5)) {
              return resolve(true);
          }

          this.router.navigate(['/home']);
          this.snackService.showSnackBar('Limit of 5 collections per user');
          return resolve(false);
      });

        return resolve(true);
      }, err => {
        this.router.navigate(['/home']);
        this.snackService.showSnackBar('Please login to view this page');
        return resolve(false);
      })
    })
  }
}
