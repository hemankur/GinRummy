import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../api/user.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private username: string;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
  }

  onClickPlay() {
    this.router.navigate(['lobby'])
      .catch(err => console.log(err));
  }

  onClickRules() {
    this.router.navigate(['rules'])
      .catch(err => console.log(err));
  }

  onClickLogout() {
    this.userService.userLogout(this.username)
      .then((res: { message: string, status: boolean }) => {
        if (res.status) {
          this.router.navigate([''])
            .catch(err => console.log(err));
        }
      })
  }
}
