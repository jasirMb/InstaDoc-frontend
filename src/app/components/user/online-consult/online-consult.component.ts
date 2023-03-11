import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LoadingComponent } from '../loading/loading.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-online-consult',
  templateUrl: './online-consult.component.html',
  styleUrls: ['./online-consult.component.css'],
})
export class OnlineConsultComponent implements OnInit {
  onlineDoctors: any = [];
  socket: any;
  data: object = {};
  userId: any;
  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private dialogRef: MatDialog,
    public router: Router
  ) {
    this.socket = this.chatService.getSocket();
  }
  ngOnInit(): void {
    this.userService.onlineDoctor().subscribe(
      (response) => {
        console.log(response);
        this.onlineDoctors = response;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  chatNow(id: string): void {
    this.chatService.getId().subscribe((response) => {
      console.log(response);
      this.userId = response;
      localStorage.setItem('userId', '' + response);
      this.socket.emit('new-user-add', this.userId);
      const userId: object = response;
      this.data = { userId, id };
      console.log(this.data);
      this.socket.emit('notifyDoc', this.data);
      this.chatService.setConnection(this.data).subscribe((response) => {
        console.log(response);
        
      })
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '520px';
      dialogConfig.height = '350px';
      dialogConfig.data = 'You have one chat request ';
      const dialogRef = this.dialogRef.open(LoadingComponent, dialogConfig);
      
    });
  }
}
