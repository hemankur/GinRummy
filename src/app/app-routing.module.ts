import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {LobbyComponent} from "./lobby/lobby.component";
import {MenuComponent} from "./menu/menu.component";


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'lobby', component: LobbyComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
