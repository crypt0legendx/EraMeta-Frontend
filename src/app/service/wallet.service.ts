import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {DEVNET_URL} from "../common/constants";

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private clusterUrlSource = new BehaviorSubject(DEVNET_URL);
  clusterUrl = this.clusterUrlSource.asObservable();

  constructor() { }

  changeClusterUrl(url: string) {
    this.clusterUrlSource.next(url)
  }
}
