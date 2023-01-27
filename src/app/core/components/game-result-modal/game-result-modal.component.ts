import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-result-modal',
  templateUrl: './game-result-modal.component.html',
  styleUrls: ['./game-result-modal.component.scss'],
})
export class GameResultModalComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  @Input() completeWords: number;
  @Input() totalTime: number;
  @Input() record: number;

  constructor() {}

  ngOnInit(): void {}
}
