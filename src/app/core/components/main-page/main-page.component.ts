import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { WordsService } from '../../services/words.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  isPlaying = false;
  showResult = false;
  wordToType = 'go';
  form: FormGroup;
  time = 60;
  message = '';
  score = 0;

  constructor(
    public gameService: GameService,
    private wordsService: WordsService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      typingWord: new FormControl('', Validators.required),
    });

    // this.updateWord();
  }
  get typingWord(): string {
    return this.form.get('typingWord')?.value;
  }
  check() {
    console.log(this.typingWord);
    if (this.typingWord.toLowerCase().trim() === 'go' && !this.isPlaying) {
      this.isPlaying = true;
      this.updateWord();
      this.startGameAudio();
      const interval = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        } else {
          clearInterval(interval);
          this.resetGame();
        }
      }, 1000);
    }
    this.successWord();
  }
  successWord() {
    if (this.typingWord) {
      if (this.typingWord.trim().toLowerCase() === this.wordToType) {
        this.gameService.incrementScore();
        this.updateWord();
      }
    }
  }
  resetGame() {
    this.isPlaying = false;
    this.time = 60;
    this.wordToType = 'go';
    this.form.reset();
    this.score = this.gameService.score;
    this.gameService.resetGame();
    this.endGameAudio();
    this.showResult = true;
    console.log(this.gameService.scores);
  }
  updateWord() {
    this.wordToType = this.wordsService.getRandomWord().toLowerCase();
    this.form.reset();
  }
  deleteTypedWord() {
    this.form.get('typingWord')?.reset();
  }
  downCounter(): void {
    setTimeout(() => {
      this.time--;
    }, 60000);
  }
  startGameAudio() {
    const audio = new Audio(
      '../../../../assets/sound effects/game-start-6104.mp3'
    );
    audio.play();
  }
  endGameAudio() {
    const audio = new Audio(
      '../../../../assets/sound effects/big-impact-7054.mp3'
    );
    audio.play();
  }
  closeResultModal() {
    this.showResult = false;
    this.form.reset();
  }
}
