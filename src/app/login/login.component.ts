import {Component, OnInit} from '@angular/core';
import {UserService} from "../api/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  name: string;
  password: string;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    let userData = {
      username: this.name,
      password: this.password
    };
    this.userService.userLogin(userData)
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
      });
  }
}
