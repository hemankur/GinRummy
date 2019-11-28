import {Component, OnInit} from '@angular/core';
import {UserService} from "../api/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    let userData = {
      username: this.username,
      password: this.password
    };
    this.userService.userLogin(userData)
      .then((res: { message: string, auth: boolean }) => {
        if (res.auth) {
          localStorage.setItem('username', userData.username);
          this.router.navigate(['menu'])
            .catch(err => console.log(err));
        } else {
          this.errorMessage = res.message;
          console.log(this.errorMessage);
        }
      }).catch(err => {
      console.log(err);
    });
  }

  onClickTest() {
    this.userService.getUserData(this.username)
      .then(res => {
        console.log(res);
      });
  }
}
