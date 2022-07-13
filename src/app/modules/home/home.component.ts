import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { SnackService } from 'src/app/service/snack.service';
// import { WalletName } from '@solana/wallet-adapter-base';
// import { WalletStore } from '@heavy-duty/wallet-adapter';
// import { WalletService } from '../../service/wallet.service';
// import { MAINNET_BETA_URL } from '../../common/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../css/accordionFAQ.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('widgetRise') widgetRise: ElementRef;
  @ViewChild('widgetLaunchpad') widgetLaunchpad: ElementRef;
  @ViewChild('widgetOriginal') widgetOriginal: ElementRef;
  @ViewChild('widgetDAO') widgetDAO: ElementRef;
  @ViewChild('widgetTeam') widgetTeam: ElementRef;

  nftCollections: Array<any> = [
    {
      image: '../../../assets/images/collection1.png',
      name: 'EraMeta DAO',
      creator: 'EraMeta',
    },
    {
      image: '../../../assets/images/collection2.png',
      name: 'Automobili Art',
      creator: 'Paul Chenard',
    },
    {
      image: '../../../assets/images/collection3.png',
      name: 'GLITCH Magazine',
      creator: 'GLITCH MAGAZINE LTD',
    },
  ];

  teamMembers: Array<any> = [
    {
      image: '../../../assets/images/team/1.png',
      name: 'Nathaniel Remy',
      role: 'Co-President & CTO',
      linkedin: '#',
      twitter: '#',
    },
    {
      image: '../../../assets/images/team/2.png',
      name: 'Damon Robinson',
      role: 'Co-President & CEO',
      linkedin: '#',
      twitter: '#',
    },
    {
      image: '../../../assets/images/team/3.png',
      name: 'Jonathan Bouchard',
      role: 'COO',
      linkedin: '#',
      twitter: '#',
    },
    {
      image: '../../../assets/images/team/4.png',
      name: 'Alizhan Akhmetkaliyev',
      role: 'SOFTWARE ARCHITECT',
      linkedin: '#',
      twitter: '#',
    },
    {
      image: '../../../assets/images/team/5.png',
      name: 'Jordan Edelstein',
      role: 'Creative Director',
      linkedin: '#',
      twitter: '#',
    },
  ];

  iconifyScriptElement: HTMLScriptElement;

  goldKeyDownloadURL =
    'https://firebasestorage.googleapis.com/v0/b/truenfts.appspot.com/o/Manual_Input%2FEraMeta-Gold-Key.gif?alt=media&token=af4c6c8f-3bcf-46e3-a5f1-9a1b87bd2460';
  metaVenturesImgOne =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8p-7Pxa2TwrcYWjYfC6mD_-vNIiw-xjxPCA&usqp=CAU';
  metaVenturesImgTwo =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuC0gj96AUhaYQ1_o9vEK56Nz7tHRLacr64A&usqp=CAU';
  metaVenturesImgThree =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT58U8z-mQbx2lXzX5HpvSC5VOU1PNNZn2QQQ&usqp=CAU';

  // isModalOpen: boolean = false;
  // readonly publicKey$ = this._walletStore.publicKey$;

  constructor(
    // private snackService: SnackService,
    // private walletService: WalletService,
    // private readonly _walletStore: WalletStore,
    private router: Router
  ) {
    this.iconifyScriptElement = document.createElement('script');
    this.iconifyScriptElement.src =
      'https://code.iconify.design/2/2.0.4/iconify.min.js';
    document.body.appendChild(this.iconifyScriptElement);
  }

  ngOnInit(): void {

  }

  openMetaVentures() {
    this.router.navigate(['meta-ventures']);
  }

  // preOrder() {
  //   this.walletService.changeClusterUrl(MAINNET_BETA_URL);
  //   this.snackService.showSnackBar("Pre-sale is currently closed");
  // }

  // onConnect(walletName: string) {
  //   this.walletService.changeClusterUrl(MAINNET_BETA_URL);
  //   this._walletStore.connect().subscribe(
  //     (result) => {
  //       this.snackService.showSnackBar('Successfully connected to ' + walletName + ' wallet');
  //       this.isModalOpen = false;
  //     },
  //     (error) =>  {
  //       this.snackService.showSnackBar('Could not connect to wallet');
  //       this.isModalOpen = false;
  //     }
  //   );
  // }

  // onSelectWallet(walletName: WalletName) {
  //   this._walletStore.selectWallet(walletName);
  //   this.onConnect(walletName.toString());
  //   this.isModalOpen = false;
  // }

  // openWalletSelector() {
  //   this.isModalOpen = true;
  // }

  // closeWalletSelector(e: MouseEvent) {
  //   let target = e.target as HTMLElement;
  //   if (target.id !== "closeModal") {
  //     return;
  //   }
  //   this.isModalOpen = false;
  // }

  rightScrollRiseDisabled: boolean = false;
  leftScrollRiseDisabled: boolean = true;
  rightScrollLaunchpadDisabled: boolean = false;
  leftScrollLaunchpadDisabled: boolean = true;
  rightScrollOriginalDisabled: boolean = false;
  leftScrollOriginalDisabled: boolean = true;
  rightScrollDAODisabled: boolean = false;
  leftScrollDAODisabled: boolean = true;
  rightScrollTeamDisabled: boolean = false;
  leftScrollTeamDisabled: boolean = true;

  scrollLeftRise() {
    this.widgetRise.nativeElement.scrollLeft -= 150;
    this.checkScrollRise();
  }

  scrollRightRise() {
    this.widgetRise.nativeElement.scrollLeft += 150;
    this.checkScrollRise();
  }

  onScrollRiseSection() {
    this.checkScrollRise();
  }

  checkScrollRise() {
    this.widgetRise.nativeElement.scrollLeft == 0
      ? (this.leftScrollRiseDisabled = true)
      : (this.leftScrollRiseDisabled = false);

    let newScrollLeft = this.widgetRise.nativeElement.scrollLeft;
    let width = this.widgetRise.nativeElement.clientWidth;
    let scrollWidth = this.widgetRise.nativeElement.scrollWidth;
    scrollWidth - (newScrollLeft + width) == 0
      ? (this.rightScrollRiseDisabled = true)
      : (this.rightScrollRiseDisabled = false);
  }

  scrollLeftLaunchpad() {
    this.widgetLaunchpad.nativeElement.scrollLeft -= 150;
    this.checkScrollLaunchpad();
  }

  scrollRightLaunchpad() {
    this.widgetLaunchpad.nativeElement.scrollLeft += 150;
    this.checkScrollLaunchpad();
  }

  onScrollLaunchpadSection() {
    this.checkScrollLaunchpad();
  }

  checkScrollLaunchpad() {
    this.widgetLaunchpad.nativeElement.scrollLeft == 0
      ? (this.leftScrollLaunchpadDisabled = true)
      : (this.leftScrollLaunchpadDisabled = false);

    let newScrollLeft = this.widgetLaunchpad.nativeElement.scrollLeft;
    let width = this.widgetLaunchpad.nativeElement.clientWidth;
    let scrollWidth = this.widgetLaunchpad.nativeElement.scrollWidth;
    scrollWidth - (newScrollLeft + width) == 0
      ? (this.rightScrollLaunchpadDisabled = true)
      : (this.rightScrollLaunchpadDisabled = false);
  }

  scrollLeftOriginal() {
    this.widgetOriginal.nativeElement.scrollLeft -= 150;
    this.checkScrollOriginal();
  }

  scrollRightOriginal() {
    this.widgetOriginal.nativeElement.scrollLeft += 150;
    this.checkScrollOriginal();
  }

  onScrollOriginalSection() {
    this.checkScrollOriginal();
  }

  checkScrollOriginal() {
    this.widgetOriginal.nativeElement.scrollLeft == 0
      ? (this.leftScrollOriginalDisabled = true)
      : (this.leftScrollOriginalDisabled = false);

    let newScrollLeft = this.widgetOriginal.nativeElement.scrollLeft;
    let width = this.widgetOriginal.nativeElement.clientWidth;
    let scrollWidth = this.widgetOriginal.nativeElement.scrollWidth;
    scrollWidth - (newScrollLeft + width) == 0
      ? (this.rightScrollOriginalDisabled = true)
      : (this.rightScrollOriginalDisabled = false);
  }

  scrollLeftDAO() {
    this.widgetDAO.nativeElement.scrollLeft -= 150;
    this.checkScrollDAO();
  }

  scrollRightDAO() {
    this.widgetDAO.nativeElement.scrollLeft += 150;
    this.checkScrollDAO();
  }

  onScrollDAOSection() {
    this.checkScrollDAO();
  }

  checkScrollDAO() {
    this.widgetDAO.nativeElement.scrollLeft == 0
      ? (this.leftScrollDAODisabled = true)
      : (this.leftScrollDAODisabled = false);

    let newScrollLeft = this.widgetDAO.nativeElement.scrollLeft;
    let width = this.widgetDAO.nativeElement.clientWidth;
    let scrollWidth = this.widgetDAO.nativeElement.scrollWidth;
    scrollWidth - (newScrollLeft + width) == 0
      ? (this.rightScrollDAODisabled = true)
      : (this.rightScrollDAODisabled = false);
  }

  scrollLeftTeam() {
    this.widgetTeam.nativeElement.scrollLeft -= 150;
    this.checkScrollTeam();
  }

  scrollRightTeam() {
    this.widgetTeam.nativeElement.scrollLeft += 150;
    this.checkScrollTeam();
  }

  onScrollTeamSection() {
    this.checkScrollTeam();
  }

  checkScrollTeam() {
    this.widgetTeam.nativeElement.scrollLeft == 0
      ? (this.leftScrollTeamDisabled = true)
      : (this.leftScrollTeamDisabled = false);

    let newScrollLeft = this.widgetTeam.nativeElement.scrollLeft;
    let width = this.widgetTeam.nativeElement.clientWidth;
    let scrollWidth = this.widgetTeam.nativeElement.scrollWidth;
    scrollWidth - (newScrollLeft + width) == 0
      ? (this.rightScrollTeamDisabled = true)
      : (this.rightScrollTeamDisabled = false);
  }
}
