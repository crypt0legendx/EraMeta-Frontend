import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackService } from 'src/app/service/snack.service';
import { Auth } from '@angular/fire/auth';
import { getDatabase, ref, onValue, update, set } from "firebase/database";
import {UploaderService} from '../../service/uploader.service';
import {
  Collection,
  COLLECTIONS_DB_PATH,
  COLLECTIONS_STORAGE_PATH,
  PROFILE_IMAGES_FOLDER_PATH,
  EMPTY_STRING,
  FILE_TYPE_PNG,
  FILE_TYPE_JPG,
  FILE_TYPE_JPEG,
  CollectionImage
} from 'src/app/common/constants';
import { MatStepper } from '@angular/material/stepper';
import { PreviewService } from "../../service/preview.service";
import { PublicKey } from '@solana/web3.js';
import { DeploymentService } from 'src/app/service/deployment.service';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css']
})
export class CollectionDetailsComponent implements OnInit {

  private database = getDatabase();
  eraMetaPublicKey: string = "H2as6YSWqEjQRPP7hM94MxnkNkgjUA4Njd7xq4t6zk26";
  someTestWalletPublicKey: string = "2buiwP7QbgG8Q4pUmUBRkC3MEhg2imq4v1UccnVvpTUD";

  collection: Collection | null = null
  profileImageFile: File | null;

  selectedFileType: string = EMPTY_STRING;
  height: number = 500;
  width: number = 500;

  isEditingProfileImage: boolean = false;
  isProfileImageUploading: boolean = false;
  isDeployed: boolean = false;

  collectionLayers: Map<string,Map<string, File>> = new Map();
  groupNames: string[] = []

  @ViewChild('titleInput') titleInput: ElementRef;
  @ViewChild('descriptionInput') descriptionInput: ElementRef;

  constructor(private route: ActivatedRoute,
    private auth: Auth,
    private router: Router,
    private snackService: SnackService,
    private fileUploader: UploaderService,
    private previewService: PreviewService,
    private deploymentService: DeploymentService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.fetchCollection(params['collectionId']);
      this.fetchCollectionImages(params['collectionId']);
    });
  }

  setIsDeployed(isDeployed: boolean) {
    this.isDeployed = isDeployed
  }

  fetchCollectionImages(collectionId: string) {
    let currentUserId = this.auth.currentUser?.uid;

    if (!currentUserId) {
      this.abortAndGoBackToDashBoard()
      return;
    }

    let collectionRef = ref(this.database, 'images/collections/' + currentUserId + '/' + collectionId);
    onValue(collectionRef, (snapshot) => {
      let data = snapshot.val();
      let fetchedCollection = data as CollectionImage;
      if (!fetchedCollection) {
        this.setIsDeployed(false)
        return;
      }
      this.setIsDeployed(true)
    });
  }

  fetchCollection(collectionId: string) {
    let currentUserId = this.auth.currentUser?.uid;

    if (!currentUserId) {
      this.abortAndGoBackToDashBoard()
      return;
    }

    let collectionRef = ref(this.database, 'collections/' + currentUserId + '/' + collectionId);
    onValue(collectionRef, (snapshot) => {
      let data = snapshot.val();
      let fetchedCollection = data as Collection;

      // If collection creatorId !== currentUser.uid GET OUT
      if ((!fetchedCollection) || (fetchedCollection.creatorUserId !== currentUserId)) {
        this.abortAndGoBackToDashBoard()
        return;
      }

      this.collection = fetchedCollection;
    });
  }

  abortAndGoBackToDashBoard() {
    this.snackService.showSnackBar("We were unable to find your collection. Please try again");
    this.router.navigate(['dashboard']);
  }

  toggleProfileImage() {
    this.isEditingProfileImage = !this.isEditingProfileImage;
    this.isProfileImageUploading = false;
  }

  setprofileImageFile(file: File) {
    this.profileImageFile = file
  }

  saveNewProfileImage() {
    if (!this.profileImageFile) {
      this.snackService.showSnackBar('Please upload a proper file');
      return
    }

    let droppedFile = this.profileImageFile;

    // Max file size : 25MB // Global Max is 25 MB
    if (droppedFile.size > 25000000) {
      this.snackService.showSnackBar("Your file is too big");
      return;
    }

    // @ts-ignore
    if (!((droppedFile.type === "image/png") || (droppedFile.type === "image/jpg") || (droppedFile.type === "image/jpeg") || (droppedFile.type === "image/gif"))) {
      this.snackService.showSnackBar("Only .png, .jpg & gif files accepted");
      return;
    }

    if (!this.collection) {
      this.snackService.showSnackBar("Oops something went wrong, please try again.");
      return;
    }

    let currentCollection = this.collection;

    this.isProfileImageUploading = true

    this.fileUploader.startUploadProfileImage(COLLECTIONS_STORAGE_PATH + PROFILE_IMAGES_FOLDER_PATH + currentCollection.creatorUserId + '/' + currentCollection.collectionId,
    droppedFile, COLLECTIONS_DB_PATH + currentCollection.creatorUserId + '/' + currentCollection.collectionId, 'collectionProfileImageURL')
    .then(() => {
      this.isProfileImageUploading = false;
      this.toggleProfileImage();
      this.snackService.showSnackBar("Successfully updated image");
    })
    .catch(() => {
      this.isProfileImageUploading = false;
      this.snackService.showSnackBar("Oops something went wrong, please try again.");
    })
  }

  isTitleUploading: boolean = false;
  saveTitle() {
    let title = this.titleInput.nativeElement.value as string;

    if (title === '' || title === null || title.charAt(0) === ' ') {
      return;
    }

    if (title.length > 35) {
      this.snackService.showSnackBar("Title must be under 35 characters");
      return;
    }

    if (!this.collection || title === this.collection?.collectionTitle) {
      return;
    }

    this.isTitleUploading = true;

    let collectionRef = COLLECTIONS_DB_PATH + this.collection.creatorUserId + '/' + this.collection.collectionId;
    update(ref(this.database, collectionRef), {'collectionTitle' : title}).then((_) => {
      this.snackService.showSnackBar("Successfully updated title");
      this.isTitleUploading = false;
      this.titleInput.nativeElement.value = '';
    }).catch((error) => {
      this.snackService.showSnackBar("Oops something went wrong, please try again.");
      this.isTitleUploading = false;
    })
  }

  isDescriptionUploading: boolean = false;
  saveDescription() {
    let description = this.descriptionInput.nativeElement.value as string;

    if (description === '' || description === null || description.charAt(0) === ' ') {
      return;
    }

    if (description.length > 280) {
      this.snackService.showSnackBar("Description must be under 280 characters");
      return;
    }

    if (!this.collection || description === this.collection?.collectionDescription) {
      return;
    }

    this.isDescriptionUploading = true;

    let collectionRef = COLLECTIONS_DB_PATH + this.collection.creatorUserId + '/' + this.collection.collectionId;
    update(ref(this.database, collectionRef), {'collectionDescription' : description}).then((_) => {
      this.snackService.showSnackBar("Successfully updated description");
      this.isDescriptionUploading = false;
      this.descriptionInput.nativeElement.value = '';
    }).catch((error) => {
      this.snackService.showSnackBar("Oops something went wrong, please try again.");
      this.isDescriptionUploading = false;
    })
  }

  @ViewChild('button1') generateArtBTN: ElementRef;
  @ViewChild('button2') importArtBTN: ElementRef;
  didSelectArtType: boolean = false;
  isImportingArt: boolean =  false;
  canAddLayer: boolean = false;
  selectYourWay(button: number) {
    if (button === 1) {
      this.generateArtBTN.nativeElement.style.backgroundColor = "#18FB9A";
      this.importArtBTN.nativeElement.style.backgroundColor = "rgba(26, 26, 26, 1)";
      this.canAddLayer = true;
    } else if (button === 2) {
      this.generateArtBTN.nativeElement.style.backgroundColor = "rgba(26, 26, 26, 1)";
      this.importArtBTN.nativeElement.style.backgroundColor = "#18FB9A";
      this.canAddLayer = false;
    }

    this.didSelectArtType = true;
    this.isImportingArt = button === 1 ? false : true;
  }

  @ViewChild('heightInput') heightInput: ElementRef;
  @ViewChild('widthInput') widthInput: ElementRef;
  @ViewChild('traitGroupNameInput') traitGroupNameInput: ElementRef;
  @ViewChild('fileTypeSelect') fileTypeSelect: ElementRef;
  canReviewTraits: boolean = false;
  stepperInitialize(stepper: MatStepper) {
    // If user didnt specify how he wants art
    if (!this.didSelectArtType) {
      this.snackService.showSnackBar("Please select how you would like to create your art.");
      return;
    }

    // If user is importing art
    if (this.isImportingArt) {
      this.collectionLayers.clear();
      this.groupNames = [];
      this.canReviewTraits = false;
      stepper.next();
      this.snackService.showSnackBar("Imports are not available for alpha testing.")
      return;
    }

    // If user is generating art
    if (this.canAddLayer) {
      let height: number = this.heightInput.nativeElement.value;
      let width: number = this.widthInput.nativeElement.value;
      let traitGroupName: string = this.traitGroupNameInput.nativeElement.value;
      let selectedFyleType: string = this.fileTypeSelect.nativeElement.value;

      // Make sure height dimension is good
      if (height < 500 || height > 9999) {
        this.snackService.showSnackBar("Please make sure height is in between 500 - 9999.");
        return;
      }

      // Make sure width dimension is good
      if (width < 500 || width > 9999) {
        this.snackService.showSnackBar("Please make sure width is in between 500 - 9999.");
        return;
      }

      // Make sure trait group has a name
      if (traitGroupName === "" || traitGroupName === null) {
        this.snackService.showSnackBar("Please give a name to your first trait group.");
        return;
      }

      // Make sure trait group name is correct length
      if (traitGroupName.length < 2 || traitGroupName.length > 14) {
        this.snackService.showSnackBar("Please give a name to your first trait group. Between 2-14 chars");
        return;
      }

      if (selectedFyleType === EMPTY_STRING ||
        !(selectedFyleType === FILE_TYPE_PNG ||
        selectedFyleType === FILE_TYPE_JPG ||
        selectedFyleType === FILE_TYPE_JPEG)) {
          this.snackService.showSnackBar("Please select a file type")
          return;
      }

      this.selectedFileType = selectedFyleType;
      this.height = height
      this.width = width

      this.collectionLayers.clear();
      this.groupNames = [];
      this.groupNames.push(traitGroupName);
      this.canReviewTraits = true;
    }
  }

  isAddingNewTraitGroup: boolean = false;
  toggleNewTraitGroup(bool: boolean) {
    if(!bool) {
      this.isAddingNewTraitGroup = false;
      return;
    }

    if (!(this.collectionLayers.size < 20)) {
      this.snackService.showSnackBar("You have already created the maximum (20) amount of trait groups");
      return;
    }

    this.isAddingNewTraitGroup = true;
  }

  createNewTraitGroup(traitGroupName: string) {
    if (!(this.collectionLayers.size < 20)) {
      this.snackService.showSnackBar("You have already created the maximum (20) amount of trait groups");
      return;
    }

    // Make sure trait group has a name
    if (traitGroupName === "" || traitGroupName === null) {
      this.snackService.showSnackBar("Please give a name to your first trait group.");
      return;
    }

    // Make sure trait group name is correct length
    if (traitGroupName.length < 2 || traitGroupName.length > 14) {
      this.snackService.showSnackBar("Please give a name to your first trait group. Between 2-14 chars");
      return;
    }

    this.groupNames.push(traitGroupName);
    this.toggleNewTraitGroup(false);
    this.snackService.showSnackBar("Added new group: " + traitGroupName);
  }

  goToLastMatStep(stepper: MatStepper) {
    let lastStep = stepper.steps.last;
    stepper.selected = lastStep;
  }

  saveLayersInMemory(filesMap: Map<string,File>, groupName: string, currentStepperIndex: number) {
    if (!(this.collectionLayers.size <= 20)) {
      this.snackService.showSnackBar("Error saving your files. Please review and make sure that everything is up to standard.");
      return;
    }

    // Delete entire layer group if user saves with 0 layers in group
    if (filesMap.size < 1) {
      this.collectionLayers.delete(groupName);
      this.groupNames.splice(currentStepperIndex - 1, 1);
      this.canReviewTraits = this.groupNames.length >= 1;
      this.snackService.showSnackBar("Successfully removed: " + groupName + " layer group");

      return;
    }

    // Do not save if user is trying to save more than 50 layers in group
    if (filesMap.size > 50) {
      this.snackService.showSnackBar("Not saved... Maximum of 50 layers per group");
      return;
    }

    this.collectionLayers.set(groupName, filesMap);
    this.snackService.showSnackBar("Successfully updated layers");
  }

  isLoadingPreview: boolean = false;
  previewBackgroundImage: string = "https://gitlab.com/uploads/-/system/project/avatar/3880238/Temp.png"
  async previewImage() {
    if (this.collectionLayers.size < 1) {
      this.snackService.showSnackBar("Please save your layers before previewing art");
      return;
    }

    this.isLoadingPreview = true;

    // @ts-ignore
    const layersImage = []
    this.collectionLayers.forEach((value, key) => {
      let keys = Array.from( value.keys());
      const idx = Math.floor(Math.random() * keys.length);
      layersImage.push(keys[idx])
    })
    // @ts-ignore
    this.previewBackgroundImage = await this.previewService.saveProjectPreviewImage(layersImage, this.width, this.height)
    this.isLoadingPreview = false;
  }

  resetStepper(stepper: MatStepper) {
      this.collectionLayers.clear();
      this.groupNames = [];
      this.canReviewTraits = false;
      this.heightInput.nativeElement.value = "";
      this.widthInput.nativeElement.value = "";
      this.traitGroupNameInput.nativeElement.value = "";
      stepper.reset();
      this.previewBackgroundImage = "https://gitlab.com/uploads/-/system/project/avatar/3880238/Temp.png"
  }

  // MARK: Added function for alpha testing
  leaveMyFeedback() {
    // if (this.collectionLayers.size < 1) {
    //   this.snackService.showSnackBar("Please try it out before leaving feedback!");
    //   return;
    // }

    if (!this.collection) {
      // FIXME: Erorr handle something
      return;
    }

    this.deploymentService.postData(this.collection.collectionId, this.collection.creatorUserId);

    // window.open('https://docs.google.com/forms/d/e/1FAIpQLSfYGrcsnuLfCgtWks35m6C6T7Vpq5t1SsOprn4fdw03PoyV6Q/viewform?usp=sf_link');
    // this.snackService.showSnackBar("Thank you for testing!!");
    return;
  }

  // MARK: Removed for alpha testing
  isInitializingStoreFront: boolean = false
  createStoreFront() {
    if (this.collectionLayers.size < 1) {
      this.snackService.showSnackBar("Please create your art first!");
      return;
    }

    if (!(this.collectionLayers.size <= 20)) {
      this.snackService.showSnackBar("Please create your art first!");
      return;
    }

    this.isInitializingStoreFront = true;
  }

  closeStoreInitializerModal(e: MouseEvent) {
    let target = e.target as HTMLElement;
    if (target.id !== "closeModal") {
      return;
    }
    this.isInitializingStoreFront = false;
  }

  // MARK: Store Config stuff \\
  @ViewChild('saleDateInput') saleDateInput: ElementRef;
  isSaleDateUploading: boolean = false;
  saveSaleDate() {
    let saleDate = this.saleDateInput.nativeElement.value as Date;
    this.saleDateInput.nativeElement.placeholder = `${saleDate}`;

    this.snackService.showSnackBar(`Successfully updated sale date to ${saleDate}`);
    this.isSaleDateUploading = false;
  }

  @ViewChild('publicPriceInput') publicPriceInput: ElementRef;
  isPublicSalePriceUploading: boolean = false;
  savePublicSalePrice() {
    let publicPrice = this.publicPriceInput.nativeElement.value as number;
    this.publicPriceInput.nativeElement.placeholder = `${publicPrice}`;

    this.snackService.showSnackBar(`Successfully updated sale price to ${publicPrice}`);
    this.isPublicSalePriceUploading = false;
  }

  @ViewChild('supplyAmountInput') supplyAmountInput: ElementRef;
  isSavingSupplyAmount: boolean = false;
  saveSupplyAmountInput() {
    let supplyAmount = this.supplyAmountInput.nativeElement.value as number;

    if (supplyAmount < 1 || supplyAmount > 10000) {
      this.snackService.showSnackBar('Please select and amount between 1 and 10000');
      return;
    }

    this.supplyAmountInput.nativeElement.placeholder = `${supplyAmount}`;
    this.snackService.showSnackBar(`Successfully updated supply amount to ${supplyAmount}`);
    this.isSavingSupplyAmount = false;
  }

  @ViewChild('discordLinkInput') discordLinkInput: ElementRef;
  isSavingDiscordLink: boolean = false;
  saveDiscordLinkInput() {
    let link = this.discordLinkInput.nativeElement.value as string;
    this.discordLinkInput.nativeElement.placeholder = `${link}`;

    this.snackService.showSnackBar(`Successfully updated link to ${link}`);
    this.isSavingDiscordLink = false;
  }

  @ViewChild('twitterLinkInput') twitterLinkInput: ElementRef;
  isSavingTwitterLink: boolean = false;
  saveTwitterLinkInput() {
    let link = this.twitterLinkInput.nativeElement.value as string;
    this.twitterLinkInput.nativeElement.placeholder = `${link}`;

    this.snackService.showSnackBar(`Successfully updated link to ${link}`);
    this.isSavingTwitterLink = false;
  }

  @ViewChild('instagramLinkInput') instagramLinkInput: ElementRef;
  isSavingInstagramLink: boolean = false;
  saveInstagramLinkInput() {
    let link = this.instagramLinkInput.nativeElement.value as string;
    this.instagramLinkInput.nativeElement.placeholder = `${link}`;

    this.snackService.showSnackBar(`Successfully updated link to ${link}`);
    this.isSavingInstagramLink = false;
  }

  @ViewChild('websiteLinkInput') websiteLinkInput: ElementRef;
  isSavingWebsiteLink: boolean = false;
  saveWebsiteLinkInput() {
    let link = this.websiteLinkInput.nativeElement.value as string;
    this.websiteLinkInput.nativeElement.placeholder = `${link}`;

    this.snackService.showSnackBar(`Successfully updated link to ${link}`);
    this.isSavingWebsiteLink = false;
  }

  @ViewChild('primarySalesAddressInput') primarySalesAddressInput: ElementRef;
  isSavingPrimarySalesAddress: boolean = false;
  savePrimarySalesAddress() {
    let publicAddress = this.primarySalesAddressInput.nativeElement.value as string;
    this.primarySalesAddressInput.nativeElement.placeholder = `${publicAddress}`;

    this.snackService.showSnackBar("Successfully updated address");
    this.isSavingPrimarySalesAddress = false;
  }

  @ViewChild('secondary1SalesAddressInput') secondary1SalesAddressInput: ElementRef;
  @ViewChild('secondary2SalesAddressInput') secondary2SalesAddressInput: ElementRef;
  @ViewChild('secondary3SalesAddressInput') secondary3SalesAddressInput: ElementRef;
  isSavingSecondarySalesAddress: boolean = false;
  saveSecondarySalesAddress(number: number) {

    if (number === 1) {
      this.secondary1SalesAddressInput.nativeElement.placeholder = this.secondary1SalesAddressInput.nativeElement.value as string;
    } else if (number === 2) {
      this.secondary2SalesAddressInput.nativeElement.placeholder = this.secondary2SalesAddressInput.nativeElement.value as string;
    } else if (number === 3) {
      this.secondary3SalesAddressInput.nativeElement.placeholder = this.secondary3SalesAddressInput.nativeElement.value as string;
    }

    this.snackService.showSnackBar(`Successfully updated secondary address ${number}`);
    this.isSavingSecondarySalesAddress = false;
  }

  @ViewChild('symbolInput') symbolInput: ElementRef;
  isSavingSymbol: boolean = false;
  saveSymbol() {
    let symbol = this.symbolInput.nativeElement.value as string;
    this.symbolInput.nativeElement.placeholder = `${symbol}`;

    this.snackService.showSnackBar("Successfully updated NFT symbol");
    this.isSavingSymbol = false;
  }

  isDeployingStoreFront: boolean = false;
  deployStoreFront() {
    this.isDeployingStoreFront = true;
  }

  closeStoreDeployerModal(e: MouseEvent) {
    let target = e.target as HTMLElement;
    if (target.id !== "closeModal") {
      return;
    }
    this.isDeployingStoreFront = false;
  }

  getDisplayableWalletAddress(publicKey: PublicKey | string) {
    let address: string = publicKey.toString();
    let displayableAddy = address[0] + address[1] + address[2] + address[3] + " ... " + address[address.length-4] + address[address.length-3] + address[address.length-2] + address[address.length-1];
    return displayableAddy;
  }
}
