import {Component, OnInit} from '@angular/core';
import {WebSocketService} from "../api/web-socket.service";
import {GameService} from "../api/game.service";
import {IDropdownSettings} from "ng-multiselect-dropdown";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  cards: [{ suit: any, value: any }];
  cardsCopy: [{ suit: any, value: any }];
  topCard: [{ suit: any, value: any }];
  gameID: string;
  username: string;
  meld1 = [];
  meld2 = [];
  meld3 = [];
  meldMode = false;
  meld = 1;
  result: string;
  playerMessage: string;
  alternateMessage: string;
  myMeld = [];
  allMelds = [];
  layoffMode = false;
  layoffData: { card: any, meld: any };

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
      this.allMelds = res.melds;
      this.result = res.result;
      console.log(res);
      if (res.state === 1) {
        this.playerMessage = 'Player 1 draw card';
      } else if (res.state === 2) {
        this.playerMessage = 'Player 1 discard card';
      } else if (res.state === 3) {
        this.playerMessage = 'Player 2 draw card';
      } else if (res.state === 4) {
        this.playerMessage = 'Player 2 discard card';
      } else {
        this.playerMessage = 'Unknown state';
      }
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
    this.meld = 1;
    this.meldMode = !this.meldMode;
    this.cardsCopy = this.cards;
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

  showMelds() {
    this.meldMode = !this.meldMode;
  }

  onItemSelect(cards: any) {

  }

  onClickMeld1(card: any) {
    for (let i = 0; i < this.cardsCopy.length; i++) {
      if (this.cardsCopy[i].suit === card.suit && this.cardsCopy[i].value === card.value) {
        this.meld1.push(card);
        this.cardsCopy.splice(i, 1);
      }
    }
  }

  onClickMeld2(card: any) {
    for (let i = 0; i < this.cardsCopy.length; i++) {
      if (this.cardsCopy[i].suit === card.suit && this.cardsCopy[i].value === card.value) {
        this.meld2.push(card);
        this.cardsCopy.splice(i, 1);
      }
    }
  }

  onClickMeld3(card: any) {
    for (let i = 0; i < this.cardsCopy.length; i++) {
      if (this.cardsCopy[i].suit === card.suit && this.cardsCopy[i].value === card.value) {
        this.meld3.push(card);
        this.cardsCopy.splice(i, 1);
      }
    }
  }

  onClickNext() {
    this.meld++;
  }

  onClickSubmit() {
    let data = {meld1: this.meld1, meld2: this.meld2, meld3: this.meld3};
    console.log(data);
    this.webSocketService.emit('gin', data);
    this.webSocketService.listen('result').subscribe((res: any) => {
      console.log(res);
      this.result = res.message;
    });
  }

  onClickMeld() {
    this.alternateMessage = 'Select cards for meld';
    this.meldMode = !this.meldMode;
    this.myMeld = [];
  }

  onClickLayoff() {
    this.alternateMessage = 'Select card to add to a meld';
    this.layoffMode = !this.layoffMode;
    this.layoffData = {card: null, meld: null};
  }

  addToMeld(card: any) {
    this.myMeld.push(card);
  }

  createMeld() {
    this.webSocketService.emit('createMeld', {meld: this.myMeld, gameID: this.gameID});
    this.meldMode = !this.meldMode;
  }

  layoffCard(card: any) {
    console.log(card);
    this.layoffData.card = card;
  }

  submitLayoff() {
    this.webSocketService.emit('layoff', {data: this.layoffData, gameID: this.gameID});
  }
}
