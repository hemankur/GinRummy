import {Component, OnInit} from '@angular/core';
import {UserService} from "../api/user.service";
import {LobbyService} from "../api/lobby.service";
import {Socket} from "ngx-socket-io";
import {WebSocketService} from "../api/web-socket.service";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  username: string;

  constructor(private userService: UserService,
              private lobbyService: LobbyService,
              private webSocketService: WebSocketService) {
  }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userService.getUserData(this.username)
      .then(res => {
        console.log(res);
      });

    this.webSocketService.listen("test event").subscribe((data) => {
      console.log(data);
    });
  }

}
