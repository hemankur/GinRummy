import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SERVER_URL} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  createUser(userData: { username: string, password: string }) {
    return this.http.post(SERVER_URL + '/api/user/create/', userData).toPromise();
  }

  userLogin(userData: { username: string, password: string }) {
    return this.http.post(SERVER_URL + '/api/user/login/', userData).toPromise();
  }
}
