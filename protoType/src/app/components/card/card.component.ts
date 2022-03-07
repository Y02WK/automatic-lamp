import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Thought } from 'src/app/models/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  time!: Date;
  endTime!: Date;
  diffTime!: number;
  constructor() {}

  ngOnInit(): void {
    console.log(typeof this.thought!.timestamp);
    this.time = new Date(this.thought!.timestamp);
    this.endTime = new Date(this.time.getTime() + 24 * 60 * 60 * 1000);
    this.diffTime = Math.abs(this.endTime.getTime() - Date.now()) / 1000;

    console.log(Date.now());
    console.log(this.diffTime);
  }

  deleteEvent(): void {
    this.deleteCard.emit(this.index);
  }

  @Input() index!: number;
  @Input() thought: Thought | null = null;
  @Output() view = new EventEmitter<Thought>();
  @Output() deleteCard = new EventEmitter<number>();
}
