import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { MainPageComponent } from './core/components/main-page/main-page.component';
import { ErrorPageComponent } from './core/components/error-page/error-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameResultModalComponent } from './core/components/game-result-modal/game-result-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    ErrorPageComponent,
    GameResultModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
