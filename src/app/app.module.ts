import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {RegistrationComponent} from './registration/registration.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LobbyComponent} from './lobby/lobby.component';
import {MenuComponent} from './menu/menu.component';
import {RulesComponent} from './rules/rules.component';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {SERVER_URL} from "../environments/environment";
import { RoomComponent } from './room/room.component';

const config: SocketIoConfig = {
  url: SERVER_URL, options: {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NotFoundComponent,
    LobbyComponent,
    MenuComponent,
    RulesComponent,
    RoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
