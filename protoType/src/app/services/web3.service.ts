import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { ABI, CONTRACT_ADDRESS } from '../utils/W3Babi';
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  walletAddress!: string;

  constructor() {}

  setWalletAddress(address: string) {
    this.walletAddress = address;
  }

  getWalletAddress() {
    return this.walletAddress;
  }

  async mintMessage(svgObj: string) {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ABI,
          signer
        );

        console.log('Calling wallet to pay gas...');
        let nftTxn = await connectedContract.functions['mintNFT'](svgObj);

        console.log('Txn pending...please wait.');
        await nftTxn.wait();

        console.log(
          `Complete, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (e) {
      console.log(e);
    }
  }
}
