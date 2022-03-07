import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Web3Service } from './web3.service';
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class Web3GuardService implements CanActivate {
  storedWalletAddress?: string;
  selectedWalletAddress?: string;
  constructor(private router: Router, private web3Svc: Web3Service) {
    this.storedWalletAddress = web3Svc.getWalletAddress();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const { ethereum } = window;
    if (!ethereum) {
      alert('Get Metamask!');
      this.router.navigate(['']);
      return false;
    } else if (
      this.storedWalletAddress == undefined &&
      ethereum.selectedAddress == route.params['walletAddress']
    ) {
      this.web3Svc.setWalletAddress(ethereum.selectedAddress);
    } else if (
      this.storedWalletAddress != route.params['walletAddress'] &&
      ethereum.selectedAddress != route.params['walletAddress']
    ) {
      console.log(route.params['walletAddress']);
      alert('Invalid user. Please use the correct address');
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
