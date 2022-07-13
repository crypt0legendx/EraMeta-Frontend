import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { SnackService } from 'src/app/service/snack.service';
import { Auth } from '@angular/fire/auth';
import { getDatabase, ref, set } from "firebase/database";
import { DEFAULT_PROFILE_IMAGE_URL } from 'src/app/common/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class NewCollectionComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  isInitializingCollection: boolean = false;

  private database = getDatabase();

  constructor(private _formBuilder: FormBuilder, private snackService: SnackService, private auth: Auth, private router: Router) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  verifyCollectionDetails() {
    let collectionTitle = this.firstFormGroup.value.firstCtrl as string;
    let collectionDescription = this.secondFormGroup.value.secondCtrl as string;

    if (collectionTitle === "" || collectionTitle === null || collectionTitle === " " || collectionTitle.length > 35) {
      this.snackService.showSnackBar("Please specify a proper title for your collection");
      return;
    }

    if (collectionDescription === "" || collectionDescription === null || collectionDescription === " " || collectionDescription.length > 280) {
      this.snackService.showSnackBar("Please specify a proper description for your collection");
      return;
    }

    this.initializeCollection(collectionTitle, collectionDescription);
  }

  initializeCollection(collectionTitle: string, collectionDescription: string) {
    this.isInitializingCollection = true; // Set loading buffer on screen

    let currentUserId = this.auth.currentUser?.uid

    if (!currentUserId) {
      this.isInitializingCollection = false;
      this.snackService.showSnackBar("Error fetching user status. Please try logging out and back in");
      return;
    }

    let collectionId = Math.floor( Date.now() / 1000 ); // Seconds since epoch - jan 1 1970;
    let collectionsRef = "collections/" + currentUserId + "/" + collectionId;

    set(ref(this.database, collectionsRef), {
      'collectionId' : collectionId,
      'collectionTitle' : collectionTitle,
      'collectionDescription' : collectionDescription,
      'collectionProfileImageURL' : DEFAULT_PROFILE_IMAGE_URL,
      'creatorUserId' : currentUserId,
      'timeStamp' : collectionId
    }).then((_) => {
      this.isInitializingCollection = false;
      this.snackService.showSnackBar("Congratulations! " + collectionTitle + " has been initialized");
      this.goToCollectionDetails(collectionId)
    }).catch((_) => {
      this.isInitializingCollection = false;
      this.snackService.showSnackBar("Oops! " + collectionTitle + " has not been initialized. Please try again");
    })
  }

  goToCollectionDetails(collectionId: number) {
    this.router.navigate(['my-collections/' + `${collectionId}`]);
  }
}
