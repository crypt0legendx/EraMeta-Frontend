import { Component, OnInit } from '@angular/core';
import { SnackService } from 'src/app/service/snack.service';
import { getDatabase, ref, onValue } from "firebase/database";
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Collection } from 'src/app/common/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private database = getDatabase();
  collections: Collection[] = [];
  didFetchCollections: boolean = false;

  constructor(private auth: Auth, private snackService: SnackService, private router: Router) { }

  ngOnInit(): void {
    this.getCollectionsforCurrentUser();
  }

  getCollectionsforCurrentUser() {
    this.didFetchCollections = false;
    let currentUserId = this.auth.currentUser?.uid;

    if (!currentUserId) {
      return;
    }

    const collectionsRef = ref(this.database, 'collections/' + currentUserId);
      onValue(collectionsRef, (snapshot) => {
        const data = snapshot.val() as [string : Collection];
        if (!data) {
          console.log("No data returned");
          this.collections = [];
          this.didFetchCollections = true;
          return;
        }

        var safety = 0;
        for (const [_, value] of Object.entries(data)) {
          if (safety === 0) {
            this.collections = [];
          }

          let collection = value as Collection;
          if (!collection) {
            console.log("Value not Collection type");
            return;
          }

          this.collections.push(collection);

          if (safety >= 4) { // SET to 4 for collection per user limit of 5
            break;
          }
          safety++;
        }

        this.didFetchCollections = true;
      });
  }

  viewCollection(collectionId: string) {
    this.router.navigate(['my-collections/' + collectionId]);
  }

  createNewCollection() {
    //Only allow 5 collections per user for beta testing.
    if  (this.collections.length >= 5 && this.didFetchCollections) {
      this.snackService.showSnackBar('Sorry, you have reached the limit of 5 collections per alpha user.');
      return;
    }

    if (!this.didFetchCollections) {
      this.snackService.showSnackBar('Sorry, we are unable to create your collection at the moment.');
      return;
    }

    this.router.navigate(['new-collection']);
  }
}
