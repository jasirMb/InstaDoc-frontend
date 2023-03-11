import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private url = 'http://localhost:4000';
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient,private location: Location) {
    this.socket = io(this.url, {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
  }
  getId() {
    const path = this.location.path()
    const splitedPath = path.split("/")
    console.log(splitedPath[2]);
    
    if(splitedPath.includes('doctor')){
      console.log("itsdoccccccccccccccccccccccccc");
      return this.http.get(this.apiUrl + '/doctor/doctor-id');
    }else{
      console.log("its userrrrrrrrrrrrrrrrrrrrrrr");
      
      return this.http.get(this.apiUrl + '/user-id');
    }
  }
  setConnection(data:object) {
    return this.http.post(this.apiUrl + '/chatConnection',(data));
  }
  newMsg(data : object){
    return this.http.post(this.apiUrl + '/newMsg',(data));
  }
  allMessages(data : object) {
    console.log(data);
    
    return this.http.post(this.apiUrl + '/allMessages',(data));
  }
 
  // joinRoom(data: any): void {
  //   this.socket.emit('join', data);
  // }

  // sendMessage(data: any): void {
  //   this.socket.emit('message', data);
  // }

  // getMessage(): Observable<any> {
  //   return new Observable<{ user: string; message: string }>((observer) => {
  //     this.socket.on('new message', (data) => {
  //       observer.next(data);
  //     });

  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });
  // }

  // getStorage() {
  //   const storage: string | null = localStorage.getItem('chats');
  //   return storage ? JSON.parse(storage) : [];
  // }

  // setStorage(data: any) {
  //   localStorage.setItem('chats', JSON.stringify(data));
  // }
  public getSocket() {
    return this.socket;
  }
}
