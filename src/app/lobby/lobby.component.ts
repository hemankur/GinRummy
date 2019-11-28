import {Component, OnInit} from '@angular/core';
import {UserService} from "../api/user.service";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  username: string;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.username = 'hemankur';
    this.userService.getUserData(this.username)
      .then(res => {
        console.log(res);
      });
  }

}
