import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  score = 0;
  recordScore = 0;
  scores: number[] = [];
  constructor() {}

  incrementScore() {
    this.score++;
  }
  resetGame() {
    this.scores.push(this.score);
    if (this.score > this.recordScore) {
      this.recordScore = this.score;
    }
    this.score = 0;
  }
}
