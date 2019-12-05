import {Component, OnInit} from '@angular/core';
import {UserService} from "../api/user.service";
import {LobbyService} from "../api/lobby.service";
import {WebSocketService} from "../api/web-socket.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  username: string;
  rooms = [];
  games = [];
  gameID: string;

  constructor(private userService: UserService,
              private lobbyService: LobbyService,
              private router: Router,
              private webSocketService: WebSocketService) {
  }

  /*ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userService.getUserData(this.username)
      .then(res => {
        console.log(res);
      });

    this.webSocketService.listen("test event").subscribe((data) => {
      console.log(data);
    });

    this.webSocketService.listen("ready").subscribe((data) => {
      console.log(data);
    });

    this.webSocketService.listenGame("welcome").subscribe((res: { message: string, data: [] }) => {
      this.rooms = res.data;
    });

    this.webSocketService.listenGame("err").subscribe((err) => {
      console.log(err);
    });

    this.webSocketService.listenGame("created").subscribe((data) => {
      console.log(data);
      this.router.navigate(['room'])
        .catch(err => console.log(err));
    });

    this.webSocketService.listenGame("joined").subscribe((data) => {
      console.log(data);
      this.router.navigate(['room'])
        .catch(err => console.log(err));
    });

    this.webSocketService.listenGame("full").subscribe((data) => {
      console.log(data);
    });

  }*/

  ngOnInit(): void {
    this.getGames();
  }

  /*onClickJoin(room: number) {
    this.webSocketService.emitGames('joinRoom', room);
    this.webSocketService.listenGame("newUser").subscribe((data) => {
      console.log(data);
      this.router.navigate(['room'])
        .catch(err => console.log(err));
    });
  }*/

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
