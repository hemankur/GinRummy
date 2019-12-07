import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SERVER_URL} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {
  }

  getGameData(username: string, gameID: string) {
    return this.http.post(SERVER_URL + '/api/games/data', {username: username, gameID: gameID}).toPromise();
  }
}
