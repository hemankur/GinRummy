import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from "rxjs";
import {SERVER_URL} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket: any;
  games: any;

  constructor() {
    this.socket = io(SERVER_URL, {
      'reconnection': true,
      'reconnectionDelay': 1000,
      'reconnectionDelayMax': 5000,
      'reconnectionAttempts': 5000
    });
  }

  listen(eventName: string) {
    return new Observable((subscriber => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    }));
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
