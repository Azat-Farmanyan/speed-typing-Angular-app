import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  flagPaths = ['armenia.png', 'georgia.png', 'usa.png', 'russia.png'];
  activeFlagIndex = 2;
  constructor() {}
}
