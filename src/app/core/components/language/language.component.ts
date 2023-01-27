import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  menuIsOpen = false;
  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {}

  menuToggle() {
    this.menuIsOpen = !this.menuIsOpen;
  }
  closeMenu() {
    this.menuIsOpen = false;
  }
  setActiveFlag(flagIndex: number) {
    this.languageService.activeFlagIndex = flagIndex;
    this.closeMenu();
  }

  get activeFlagIndex() {
    return this.languageService.activeFlagIndex;
  }

  get getActiveFlagPath(): string {
    return '../../../../assets/flags/' + this.getActiveFlagName;
  }

  get getActiveFlagName(): string {
    return this.languageService.flagPaths[this.activeFlagIndex];
  }
}
