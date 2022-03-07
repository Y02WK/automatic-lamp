import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Thought } from 'src/app/models/models';
import { BackendService } from 'src/app/services/backend.service';
import { Web3Service } from 'src/app/services/web3.service';
declare var window: any;

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.css'],
})
export class CardDisplayComponent implements OnInit {
  @Input() thought: Thought | undefined = undefined;
  @ViewChild('mintBtn') mintBtn!: MatButton;

  constructor(
    private beSvc: BackendService,
    private web3Svc: Web3Service,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  mintButton(): void {
    this.mintBtn.disabled = true;
    this.mintNFT().then(() => {
      console.log('NFT Minted');
      this.mintBtn.disabled = false;
      this._snackBar.open('Minted!', 'Close', { verticalPosition: 'top' });
    });
  }

  async mintNFT(): Promise<void> {
    let svgObj: string = '';
    if (!this.thought) {
      return;
    }

    await this.beSvc
      .getSvg(this!.thought, this.web3Svc.getWalletAddress())
      .then(async (resp) => {
        svgObj = resp.svg;
        await this.web3Svc.mintMessage(svgObj);
      });
  }
}
