import {Component, OnInit} from '@angular/core';
import {UserService} from "../api/user.service";
import {LobbyService} from "../api/lobby.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  username: string;
  games = [];
  gameID: string;

  constructor(private userService: UserService,
              private lobbyService: LobbyService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.getGames();
  }
  onClickJoin(game: { gameID: string }) {
    console.log(game.gameID);
    const username = localStorage.getItem('username');
    this.lobbyService.joinGame(username, game.gameID)
      .then((res: any) => {
        console.log(res);
        if (res.status) {
          localStorage.setItem('gameID', game.gameID);
          this.router.navigateByUrl('room')
            .catch(err => console.log(err));
        }
      })
  }

  createGame() {
    this.lobbyService.createGame(this.gameID)
      .then((res: any) => {
        console.log(res);
        this.getGames();
      })
  }

  private getGames() {
    this.lobbyService.getData()
      .then((res: any) => {
        console.log(res);
        this.games = res.games;
      });
  }
}
