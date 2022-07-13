import {Component, ElementRef, ViewChild} from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";
import {ConnectionStore, WalletStore} from "@heavy-duty/wallet-adapter";
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolongWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {WalletService} from "./service/wallet.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EraMeta';
  isLoading: Boolean = false;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private readonly _hdConnectionStore: ConnectionStore,
    private readonly _hdWalletStore: WalletStore,
    private walletService: WalletService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false
    }, 1500)
    this._hdConnectionStore.setEndpoint(this.walletService.clusterUrl);
    this._hdWalletStore.setAdapters([
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolongWalletAdapter(),
    ]);
  }

  closeSidenav() {
    this.sidenav.close()
  }

  toggleSidenav() {
    this.sidenav.toggle()
  }
}
