import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {RegistrationComponent} from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LobbyComponent } from './lobby/lobby.component';
import { MenuComponent } from './menu/menu.component';
import { RulesComponent } from './rules/rules.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NotFoundComponent,
    LobbyComponent,
    MenuComponent,
    RulesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
