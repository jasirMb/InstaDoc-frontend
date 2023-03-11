import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {
  socket: any;
  constructor(
    public dialogRef: MatDialogRef<LoadingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private chatService: ChatService,private router: Router,private toastr: ToastrService,private dialog: MatDialog
  ) {
    this.socket = this.chatService.getSocket();
    this.socket.on('doctorAccepted', (doctorId:string) => {
      console.log("doc accepted"+doctorId);
      this.dialog.closeAll();
      this.router.navigate(['/chat','user',doctorId]);
      
    });
    this.socket.on('doctorRejected', (doctorId:string) => {
      console.log("doc accepted"+doctorId);
      this.toastr.error("doctor rejected the chat")
      this.dialog.closeAll();
      this.router.navigate(['/online_consult']);
      
    });
  }
  // ngOnInit(): void {
  //   this.chatService.getSocket
  // }
}
