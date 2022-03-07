import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { BackendService } from 'src/app/services/backend.service';
import { Web3Service } from 'src/app/services/web3.service';
import { Thought } from '../../models/models';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  thoughts!: Thought[];
  currentViewThought?: Thought;
  @ViewChild('tabGroup', { static: false }) tabGroup!: MatTabGroup;

  constructor(private beSvc: BackendService, private web3Svc: Web3Service) {}

  ngOnInit(): void {
    console.log(this.web3Svc.getWalletAddress());
    this.beSvc
      .getValidMessages(this.web3Svc.getWalletAddress())
      .then((resp) => {
        this.thoughts = resp;
        console.log(resp);
      });
  }

  //drop method
  drop(event: CdkDragDrop<Thought>): void {
    // allows movement of cards in the current swimlane
    moveItemInArray(this.thoughts, event.previousIndex, event.currentIndex);
  }

  newEntry(): void {
    this.tabGroup.selectedIndex = 1;
  }

  view(thought: Thought): void {
    console.log('View entry:', thought.msgId);
    this.tabGroup.selectedIndex = 0;
    this.currentViewThought = thought;
  }

  updateArray(thoughts: Thought[]): void {
    this.thoughts = thoughts;
  }

  delete(index: number): void {
    console.log('Delete entry:', index);
    this.thoughts.splice(index, 1);
    this.beSvc.deleteMessages(this.web3Svc.getWalletAddress());
  }
}
