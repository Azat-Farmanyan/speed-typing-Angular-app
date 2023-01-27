import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  menuIsOpen = false;
  flagPaths = ['armenia.png', 'georgia.png', 'usa.png', 'russia.png'];
  activeFlagIndex = 1;
  constructor() {}

  ngOnInit(): void {}

  menuToggle() {
    this.menuIsOpen = !this.menuIsOpen;
  }
  closeMenu() {
    this.menuIsOpen = false;
  }
  setActiveFlag(flagIndex: number) {
    this.activeFlagIndex = flagIndex;
    this.closeMenu();
  }
}
