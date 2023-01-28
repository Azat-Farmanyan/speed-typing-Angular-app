import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { GameService } from '../../services/game.service';
import { WordsService } from '../../services/words.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  isPlaying = false;
  showResult = false;
  wordToType = 'go';
  form: FormGroup;
  activeTimer = new BehaviorSubject<number>(30);
  time = 30;
  score = 0;

  activeTimeSubs: Subscription;

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
  get inputPlaceholder() {
    return !this.isPlaying ? 'Enter go to start' : '';
  }

  setTimer(timer: number) {
    this.activeTimer.next(timer);
    this.time = timer;

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  check() {
    // console.log(this.typingWord);
    if (this.typingWord.toLowerCase().trim() === 'go' && !this.isPlaying) {
      this.isPlaying = true;
      this.gameService.resetGame();
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
      // this.checkEachChar(this.typingWord, this.wordToType);
      if (this.typingWord.trim().toLowerCase() === this.wordToType) {
        this.gameService.incrementScore();
        this.updateWord();
      }
    }
  }

  checkEachChar(charIndex: number): boolean {
    return (
      this.inputWordSplitted[charIndex] === this.wordToTypeSplitted[charIndex]
    );
  }

  get inputWordSplitted() {
    return this.typingWord ? this.typingWord.toLowerCase().split('') : '';
  }

  get wordToTypeSplitted() {
    return this.wordToType ? this.wordToType.split('') : [];
  }

  resetGame() {
    this.isPlaying = false;
    // this.time = this.getTime();
    this.activeTimeSubs = this.activeTimer.subscribe((time) => {
      this.time = time;
    });
    this.wordToType = 'go';
    this.form.reset();
    this.score = this.gameService.score;
    // this.gameService.resetGame();
    this.gameService.checkRecord();
    this.endGameAudio();
    this.showResult = true;
    // console.log(this.gameService.scores);
  }

  // getTime(time: number = 60) {
  //   return 60;
  // }

  updateWord() {
    this.wordToType = this.wordsService.getRandomWord().toLowerCase();
    this.form.reset();
  }

  deleteTypedWord() {
    this.form.get('typingWord')?.reset();
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

  ngOnDestroy(): void {
    this.activeTimeSubs.unsubscribe();
  }
}
