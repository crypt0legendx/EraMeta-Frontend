import { Component, OnInit } from '@angular/core';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { PublicKey } from '@solana/web3.js';
import { WalletService } from '../../service/wallet.service';
import { DEVNET_URL, MAINNET_BETA_URL } from '../../common/constants';

@Component({
  selector: 'app-wallet-status-modal',
  templateUrl: './wallet-status-modal.component.html',
  styleUrls: ['./wallet-status-modal.component.css']
})
export class WalletStatusModalComponent implements OnInit {

  readonly publicKey$ = this._walletStore.publicKey$;

  clusterUrl: string = DEVNET_URL;

  constructor(private readonly _walletStore: WalletStore, private walletService: WalletService) { }

  ngOnInit(): void {
    this.walletService.clusterUrl.subscribe(
      (clusterUrl) => {
        this.clusterUrl = clusterUrl
      }
    )
  }

  onDisconnect() {
    this._walletStore.disconnect().subscribe();
  }

  getDisplayableWalletAddress(publicKey: PublicKey) {
    let address: string = publicKey.toString();
    let displayableAddy = address[0] + address[1] + address[2] + address[3] + " ... " + address[address.length-4] + address[address.length-3] + address[address.length-2] + address[address.length-1];
    return displayableAddy;
  }

  getDisplayableCluster(cluster: string) {
    return (cluster === MAINNET_BETA_URL) ? 'mainnet-beta' : 'devnet';
  }
}
