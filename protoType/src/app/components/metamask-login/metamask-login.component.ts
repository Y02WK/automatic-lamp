import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Web3Service } from 'src/app/services/web3.service';
declare var window: any;

@Component({
  selector: 'app-metamask-login',
  templateUrl: './metamask-login.component.html',
  styleUrls: ['./metamask-login.component.css'],
})
export class MetamaskLoginComponent implements OnInit {
  currentAccount?: string;

  constructor(
    private router: Router,
    private web3Svc: Web3Service,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  async connectWallet(): Promise<void> {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Connected', accounts[0]);
      this.currentAccount = accounts[0];
      this.web3Svc.setWalletAddress(accounts[0]);
      this._snackBar.open(`${this.currentAccount} connected.`, 'Continue');
      this.router.navigate(['/dashboard', this.currentAccount]);
    } catch (error) {
      console.log(error);
    }
  }
}
