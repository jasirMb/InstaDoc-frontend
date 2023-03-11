import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const SOCKET_ENDPOINT = 'http://localhost:4000';
@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent implements OnInit {
  allMessages: any = [];
  userId: any;
  reciverId: any;
  socket: any;
  message: string;

  constructor(private chatService: ChatService, private route: ActivatedRoute,private toastr: ToastrService,private router: Router,) {
    this.socket = this.chatService.getSocket();
    console.log(this.route.snapshot.paramMap);
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.url + 'jjjjjjjjjjjj');
    const type = this.route.snapshot.paramMap.get('type');
    console.log(type + 'ddddddddddddddddddddddd');

    if (type === 'user') {
      console.log('user on fl=oooor');
      this.reciverId = this.route.snapshot.paramMap.get('doctorId');
    } else if (type === 'doctor') {
      console.log('doctor on fl=oooor');
      this.reciverId = this.route.snapshot.paramMap.get('doctorId');
    }
    console.log('dicId', this.reciverId);
    // recieving message..................//
    this.socket.on('receive-message', (data: any) => {
      console.log(this.userId);
      this.allMessages.push(data);
      console.log(data);
    });
    this.socket.on('disconnected',() => {
      this.toastr.error('oops!disconnected try again!')
      this.router.navigate(['/online_consult']);
    })
    this.chatService.getId().subscribe((response) => {
      console.log(response);
      this.userId = response;
      const data: object = {
        receiverId: this.reciverId,
        senderId: this.userId,
      };
      console.log(data);
      this.chatService.allMessages(data).subscribe((response) => {
        console.log(response);
        this.allMessages = response
        ;
      });
    });
  }
  sendMsg() {
   
    const data = {
      messages: this.message,
      receiverId: this.reciverId,
      senderId: this.userId,
    };
    if(data.messages != ""){

      this.socket.emit('send-message', data);
      this.allMessages.push(data);
      this.chatService.newMsg(data).subscribe((response) => {
        console.log(response);
        this.message = '';
      });
    }
  }
  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.message = inputElement.value;
    console.log(this.message);
  }
}
