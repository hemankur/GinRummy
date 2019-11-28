import {Component, OnInit} from '@angular/core';
import {UserService} from "../api/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  name: string;
  password: string;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    let userData = {
      username: this.name,
      password: this.password
    };
    this.userService.createUser(userData).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }
}
