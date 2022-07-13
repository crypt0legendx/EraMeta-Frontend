import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WalletName } from '@solana/wallet-adapter-base';
import { SnackService } from 'src/app/service/snack.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { PublicKey } from '@solana/web3.js';
// import { map } from 'rxjs/operators';
import { WalletService } from '../../service/wallet.service';
import { DEVNET_URL } from '../../common/constants';

@Component({
  selector: 'app-dao',
  templateUrl: './dao.component.html',
  styleUrls: ['./dao.component.css'],
})
export class DAOComponent implements OnInit {
  @ViewChild('widgetOverview') widgetOverview: ElementRef;
  @ViewChild('widgetGoal') widgetGoal: ElementRef;

  readonly publicKey$ = this._walletStore.publicKey$;

  publicKey: PublicKey | null;
  isModalOpen: Boolean = false;
  clusterUrl: string = DEVNET_URL;

  constructor(
    private walletService: WalletService,
    private snackService: SnackService,
    private readonly _walletStore: WalletStore
  ) {}

  ngOnInit(): void {
    this.publicKey$.subscribe((publicKey) => {
      this.walletService.changeClusterUrl(DEVNET_URL);
      this.publicKey = publicKey;
    });
  }

  openVoteCategory(publicKey: PublicKey | null) {
    if (!publicKey) {
      this.snackService.showSnackBar(
        'Please connect your wallet to enter the DAO'
      );
    } else {
      this.snackService.showSnackBar(
        'Sorry, only alpha testers can view this area for now'
      );
    }
  }

  onConnect(walletName: string) {
    this.walletService.changeClusterUrl(DEVNET_URL);
    this._walletStore.connect().subscribe(
      (result) => {
        this.snackService.showSnackBar(
          'Successfully connected to ' + walletName + ' wallet'
        );
        this.isModalOpen = false;
      },
      (error) => {
        this.snackService.showSnackBar(
          'Could not connect to ' + walletName + ' wallet'
        );
        this.isModalOpen = false;
      }
    );
  }

  onSelectWallet(walletName: WalletName) {
    this._walletStore.selectWallet(walletName);
    this.onConnect(walletName.toString());
    this.isModalOpen = false;
  }

  openWalletSelector() {
    this.isModalOpen = true;
  }

  closeWalletSelector(e: MouseEvent) {
    let target = e.target as HTMLElement;
    if (target.id !== 'closeModal') {
      return;
    }
    this.isModalOpen = false;
  }

  openApplyForAlphaTesting() {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSctmBJCfCjxtfUzBMtu8RqXgw79DtPrVhQ9HAnRF-xzusobxw/viewform?usp=sf_link'
    );
  }

  getDisplayableWalletAddress() {
    if (!this.publicKey) {
      return 'Wall ... resS';
    }
    let address: string = this.publicKey.toString();
    let displayableAddy =
      address[0] +
      address[1] +
      address[2] +
      address[3] +
      ' ... ' +
      address[address.length - 4] +
      address[address.length - 3] +
      address[address.length - 2] +
      address[address.length - 1];
    return displayableAddy;
  }

  rightScrollOverviewDisabled: boolean = false;
  leftScrollOverviewDisabled: boolean = true;
  rightScrollGoalDisabled: boolean = false;
  leftScrollGoalDisabled: boolean = true;

  scrollLeftOverview() {
    this.widgetOverview.nativeElement.scrollLeft -= 150;
    this.checkScrollOverview();
  }

  scrollRightOverview() {
    this.widgetOverview.nativeElement.scrollLeft += 150;
    this.checkScrollOverview();
  }

  onScrollOverviewSection() {
    this.checkScrollOverview();
  }

  checkScrollOverview() {
    this.widgetOverview.nativeElement.scrollLeft == 0
      ? (this.leftScrollOverviewDisabled = true)
      : (this.leftScrollOverviewDisabled = false);

    let newScrollLeft = this.widgetOverview.nativeElement.scrollLeft;
    let width = this.widgetOverview.nativeElement.clientWidth;
    let scrollWidth = this.widgetOverview.nativeElement.scrollWidth;
    scrollWidth - (newScrollLeft + width) == 0
      ? (this.rightScrollOverviewDisabled = true)
      : (this.rightScrollOverviewDisabled = false);
  }

  onSwipeGoalLeft() {
    this.scrollRightGoal();
  }

  onSwipeGoalRight() {
    this.scrollLeftGoal();
  }

  scrollLeftGoal() {
    this.widgetGoal.nativeElement.scrollLeft -= 150;
    this.checkScrollGoal();
  }

  scrollRightGoal() {
    this.widgetGoal.nativeElement.scrollLeft += 150;
    this.checkScrollGoal();
  }

  onScrollGoalSection() {
    this.checkScrollGoal();
  }

  checkScrollGoal() {
    this.widgetGoal.nativeElement.scrollLeft == 0
      ? (this.leftScrollGoalDisabled = true)
      : (this.leftScrollGoalDisabled = false);

    let newScrollLeft = this.widgetGoal.nativeElement.scrollLeft;
    let width = this.widgetGoal.nativeElement.clientWidth;
    let scrollWidth = this.widgetGoal.nativeElement.scrollWidth;
    scrollWidth - (newScrollLeft + width) == 0
      ? (this.rightScrollGoalDisabled = true)
      : (this.rightScrollGoalDisabled = false);
  }
}
