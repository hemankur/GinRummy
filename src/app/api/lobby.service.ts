import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SERVER_URL} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  private options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true
  };

  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get(SERVER_URL + '/api/games', this.options).toPromise();
  }
}
