import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { YesNoPopupComponent } from '../../user/yes-no-popup/yes-no-popup.component';
import { doctorService } from 'src/app/services/doctor/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ChatService } from 'src/app/services/chat/chat.service';
@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css'],
})
export class DoctorHomeComponent implements OnInit {
  slots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ];
  docId: any;
  socket: any;
  selectedDate: string | null;
  minDate: Date;
  maxDate: Date;
  selectedTime: string;
  // @Input() data: string | null;
  details: object;
  dateError = false;
  bookedSlots: any;
  unAvailable: any;
  showSlot: boolean = false;
  constructor(
    private dialogRef: MatDialog,
    public doctorService: doctorService,
    private toastr: ToastrService,
    public router: Router,
    private datePipe: DatePipe,
    private chatService: ChatService
  ) {
    this.minDate = new Date(); // Set minimum date to today
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate() + 7);
    this.socket = this.chatService.getSocket();
  }
  ngOnInit(): void {
    this.chatService.getId().subscribe((response) => {
      console.log(response, 'doctorssssssssssssssssssssssss');
      this.docId = response;
      // localStorage.setItem('userId', '' + response);
      this.socket.emit('new-user-add', this.docId);
      // this.socket.on('receive-message', (data: any) => {
      //   console.log(data);
      // });
      this.socket.on('chatReq', (userId: object) => {
        console.log(userId + 'someone callingggggggggggggg');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '320px';
        dialogConfig.height = '150px';
        dialogConfig.data = 'You have one chat request ';
        const dialogRef = this.dialogRef.open(
          YesNoPopupComponent,
          dialogConfig
        );
        dialogRef.afterClosed().subscribe((result) => {
          let connection = {userId :userId, docID:this.docId}
          if (result) {
            console.log(result);
            let connection = {userId :userId, docID:this.docId}
            this.socket.emit('accepted', connection);
            console.log("doc accepted"+connection.userId);
           
            console.log(userId+"lllllllllllllllllllllllllllllll");
            
            this.router.navigate(['/chat','doctor',userId]);
          } else {
            console.log('User clicked No');
            this.socket.emit('rejected', connection);
          }
        });
      });
    });
  }
  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  onDateSelect($event: MatDatepickerInputEvent<any, any>) {
    this.selectedDate = $event.value;
    this.selectedDate = this.datePipe.transform(
      $event.value,
      'yyyy-MM-ddTHH:mm:ss.SSSZ'
    );
    this.showSlot = true;
    this.doctorService
      .getDocAppointments(this.selectedDate)
      .subscribe((response: any) => {
        this.bookedSlots = response.appointments;
        this.unAvailable = response.unAvailable;
        console.log(response);
      });
    // const selectedDate = $event.target.value;
    // console.log('Selected date:', selectedDate);
    // Call your function with the selected date here
  }
  isBooked(item: string): boolean {
    return this.bookedSlots.includes(item);
  }
  cancelAppointment(time: string) {
    this.selectedTime = time;
    console.log(this.selectedTime);
    const dialogConfig = new MatDialogConfig();
    if (this.selectedDate) {
      dialogConfig.width = '320px';
      dialogConfig.height = '150px';
      dialogConfig.data = 'Cancel this appointment';
      const dialogRef = this.dialogRef.open(YesNoPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('User clicked Yes');
          this.doctorService
            .cancelAppointment(this.selectedDate, this.selectedTime)
            .subscribe(
              (response: any) => {
                this.toastr.success('appointment cancelled successfully');
              },
              (error: any) => {
                this.toastr.error('something goes wrong try again');
                console.log(error);
              }
            );
        } else {
          console.log('User clicked No');
        }
      });
    } else {
      this.dateError = true;
    }
  }
  checkingslot(item: string) {
    if (this.bookedSlots !== undefined) {
      if (this.bookedSlots.includes(item)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  notAvailable(time: string) {
    this.selectedTime = time;
    console.log(this.selectedTime);
    const dialogConfig = new MatDialogConfig();
    if (this.selectedDate) {
      dialogConfig.width = '320px';
      dialogConfig.height = '150px';
      dialogConfig.data = 'make this time unavailable';
      const dialogRef = this.dialogRef.open(YesNoPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('User clicked Yes');
          this.doctorService
            .notAvailable(this.selectedDate, this.selectedTime)
            .subscribe(
              (response: any) => {
                console.log(response);
              },
              (error: any) => {
                this.toastr.error('something goes wrong try again');
              }
            );
        } else {
          console.log('User clicked No');
        }
      });
    } else {
      this.dateError = true;
    }
  }
  checkingAvailability(item: string) {
    if (this.unAvailable !== undefined) {
      if (this.unAvailable.includes(item)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
