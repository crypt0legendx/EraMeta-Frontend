import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WalletName } from '@solana/wallet-adapter-base';
import { ConnectionStore, WalletStore } from '@heavy-duty/wallet-adapter';
import { WalletService } from 'src/app/service/wallet.service';
import { Collection, DEVNET_URL, MAINNET_BETA_URL } from 'src/app/common/constants';
import { SnackService } from 'src/app/service/snack.service';
import { PublicKey, LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js';
import { concatMap, first } from 'rxjs/operators';
import { defer, from } from 'rxjs';
import { isNotNull } from './operators/not-null';

@Component({
  selector: 'app-deploy-store-modal',
  templateUrl: './deploy-store-modal.component.html',
  styleUrls: ['./deploy-store-modal.component.css']
})
export class DeployStoreModalComponent implements OnInit {

  @Input() currentCollection: Collection | null;
  @Output() closeEvent = new EventEmitter<MouseEvent>();

  isDeploying: boolean = false;
  didSuccessfullyDeploy: boolean = false;

  isWalletSelectorOpen: boolean = false;

  readonly publicKey$ = this._walletStore.publicKey$;
  readonly connection$ = this._connectionStore.connection$;

  recipient = 'H2as6YSWqEjQRPP7hM94MxnkNkgjUA4Njd7xq4t6zk26';
  gifUrl: string = "https://media4.giphy.com/media/l2Sqb0owUC5s5tz5m/200w.webp?cid=ecf05e47hio1i2dqplc5vnldem0jcptj8pt7yfc5mto7qpng&rid=200w.webp&ct=g"

  constructor(private snackService: SnackService,
    private readonly _connectionStore: ConnectionStore,
    private readonly _walletStore: WalletStore,
    private walletService: WalletService) { }

  ngOnInit(): void {
  }

  closeModal(e: MouseEvent) {
    let target = e.target as HTMLElement;
    if (target.id !== "closeModal") {
      return;
    }

    if (this.isDeploying) {
      this.snackService.showSnackBar("Please do not close or refresh tab until the deployment has completed");
      return;
    }

    this.closeEvent.emit(e);
  }

  openWalletSelector() {
    this.isWalletSelectorOpen = true;
  }

  closeWalletSelector(e: MouseEvent) {
    let target = e.target as HTMLElement;
    if (target.id !== "closeModal") {
      return;
    }
    this.isWalletSelectorOpen = false;
  }

  onSelectWallet(walletName: WalletName) {
    this._walletStore.selectWallet(walletName);
    this.onConnect(walletName.toString());
    this.isWalletSelectorOpen = false;
  }

  onConnect(walletName: string) {
    // this.isMainnet = this.isTempMainnet;
    this.walletService.changeClusterUrl(DEVNET_URL);
    this._walletStore.connect().subscribe(
      (result) => {
        this.snackService.showSnackBar('Successfully connected to ' + walletName + ' wallet');
        this.isWalletSelectorOpen = false;
      },
      (error) =>  {
        this.snackService.showSnackBar('Could not connect to wallet');
        this.isWalletSelectorOpen = false;
      }
    );
  }

  deploy(publicKey: PublicKey) {
    if (this.isDeploying) {
      this.snackService.showSnackBar("Currently deploying...");
      return;
    }

    this.isDeploying = true;
    this.onSendTransaction(publicKey);
  }

  onSendTransaction(fromPubkey: PublicKey) {
    this.connection$
      .pipe(
        first(),
        isNotNull,
        concatMap((connection) =>
          from(defer(() => connection.getRecentBlockhash())).pipe(
            concatMap(({ blockhash }) =>
              this._walletStore.sendTransaction(
                new Transaction({
                  recentBlockhash: blockhash,
                  feePayer: fromPubkey,
                }).add(
                  SystemProgram.transfer({
                    fromPubkey,
                    toPubkey: new PublicKey(this.recipient),
                    lamports: LAMPORTS_PER_SOL * 0.0010,
                  })
                ),
                connection
              )
            )
          )
        )
      )
      .subscribe(
        (signature) => {
          this.snackService.showSnackBar("Successful transaction!");
          console.log(`Transaction sent (${signature})`)
          this.executeDeployment();
        },
        (error) =>  {
          this.snackService.showSnackBar(`Unsuccessful transaction... Please try again`)
          this.isDeploying = false;
          console.error(error)
        }
      );
  }

  executeDeployment() {
    this.isDeploying = true;
    setTimeout(() => {
      this.isDeploying = false
      this.didSuccessfullyDeploy = true;
    }, 6500)
  }

  openStoreFront() {
    window.open('http://localhost:3000/');
  }
}
