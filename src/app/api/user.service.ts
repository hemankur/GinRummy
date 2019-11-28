import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SERVER_URL} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true
  };

  constructor(private http: HttpClient) {
  }

  createUser(userData: { username: string, password: string }) {
    return this.http.post(SERVER_URL + '/api/user/create/', userData).toPromise();
  }

  userLogin(userData: { username: string, password: string }) {
    return this.http.post(SERVER_URL + '/api/user/login/', userData, this.options).toPromise();
  }

  getUserData(username) {
    return this.http.get(SERVER_URL + '/api/user/' + username, this.options).toPromise();
  }
}
