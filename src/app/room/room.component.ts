import {Component, OnInit} from '@angular/core';
import {WebSocketService} from "../api/web-socket.service";
import {GameService} from "../api/game.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  cards: [{ suit: any, value: any }];
  topCard: [{ suit: any, value: any }];
  gameID: string;
  username: string;

  constructor(private webSocketService: WebSocketService, private gameService: GameService) {
    this.gameID = localStorage.getItem('gameID');
    this.username = localStorage.getItem('username');
  }

  ngOnInit() {
    this.gameID = localStorage.getItem('gameID');
    this.username = localStorage.getItem('username');
    this.gameService.getGameData(this.username, this.gameID)
      .then(res => {
        console.log(res);
      });

    this.webSocketService.emit('init', {
      username: this.username,
      gameID: this.gameID
    });

    this.webSocketService.listen('initData').toPromise().then((res: any) => {
      this.cards = res.cards;
      this.topCard = res.top;
      console.log(res);
    });

    this.webSocketService.listen('updateGame').subscribe((res: any) => {
      this.cards = res.cards;
      this.topCard = res.top;
      console.log(res);
    });
  }

  onClickCard(card: any) {
    this.webSocketService.emit('move', {username: this.username, gameID: this.gameID, card: card});
  }

  onClickTop() {
    this.webSocketService.emit('topCard', {username: this.username, topCard: this.topCard, gameID: this.gameID});
  }

  getNewCard() {
    this.webSocketService.emit('newCard', {username: this.username, gameID: this.gameID});
  }

  onClickGin() {

  }

  onClickKnock() {

  }

  reconnect() {
    this.webSocketService.emit('myreconnect', {username: this.username, gameID: this.gameID});
    this.webSocketService.listen('reconnect').toPromise()
      .then(res => {
        console.log(res);
      })
  }
}
