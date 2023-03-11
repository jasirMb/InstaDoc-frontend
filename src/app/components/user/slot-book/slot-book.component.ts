import { Component, OnInit, Input } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef
} from '@angular/material/dialog';
import { YesNoPopupComponent } from '../yes-no-popup/yes-no-popup.component';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-slot-book',
  templateUrl: './slot-book.component.html',
  styleUrls: ['./slot-book.component.css'],
})
export class SlotBookComponent {
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
  selectedDate: string|null;
  minDate: Date;
  maxDate : Date;
  selectedTime: string;
  paymentHandler: any = null;
  token: any;
  @Input() data: string | null;
  orderDetails: object;
  details: object;
  dateError = false;
  bookedSlots: any;
  busySlots : any;
  showSlot : boolean = false
  constructor(
    private dialogRef: MatDialog,
    public userService: UserService,
    private toastr: ToastrService,
    public router: Router,
    private datePipe :DatePipe
  ) {
    this.minDate = new Date(); // Set minimum date to today
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate() + 7);
  }
  ngOnInit() {
    this.invokeStripe();
  }
  onDateSelect($event: MatDatepickerInputEvent<any, any>) {
    this.selectedDate =this.datePipe.transform($event.value,'yyyy-MM-ddTHH:mm:ss.SSSZ') 
    this.showSlot = true
    this.details = {
      doctorId: this.data,
      date: this.selectedDate,
    };
    console.log(this.details);
    this.userService.getDocAppointments(this.details).subscribe((response : any) => {
      this.bookedSlots = response.times;
      this.busySlots = response.unAvailable
      console.log(this.bookedSlots);
    });
    // const selectedDate = $event.target.value;
    // console.log('Selected date:', selectedDate);
    // Call your function with the selected date here
  }
  isBooked(item: string): boolean {
    return this.bookedSlots.includes(item);
  }
  slotTime(time: string) {
    this.selectedTime = time;
    console.log(this.selectedTime);
    const dialogConfig = new MatDialogConfig();
    if (this.selectedDate) {
      dialogConfig.width = '320px';
      dialogConfig.height = '150px';
      dialogConfig.data = "book appointment on this time"
      const dialogRef = this.dialogRef.open(YesNoPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('User clicked Yes');
          this.makePayment(100 * 100);
        } else {
          console.log('User clicked No');
        }
      });
    } else {
      this.dateError = true;
    }
  }
  makePayment(amount: number) {
    console.log('payed');
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51McR2MSACriAWWdeBeHln7lojzaJPgbxLDANWq9eIpX1OjXVL1C7YVYBwrhb2QalZuBbD36bhFKrryC1x9JfPDot00HpNR1MIV',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentStripe(stripeToken);
      },
    });
    const paymentStripe = (stripeToken: any) => {
      this.userService.checkout(stripeToken).subscribe((data: any) => {
        console.log(data);
        if (data.data === 'success') {
          console.log('payment success');
          this.toastr.success('Payment success');
          this.token = this.userService.getToken();
          console.log(this.token);

          this.orderDetails = {
            doctorId: this.data,
            token: this.token,
            date: this.selectedDate,
            time: this.selectedTime,
          };
          this.userService.createOrder(this.orderDetails).subscribe((data) => {
            console.log(data);
            if (data) {
              this.toastr.success('appointment success');

              this.router.navigate(['/my_appointments']);
            }
          });
        } else {
          console.log('payment failed');
        }
      });
    };

    paymentHandler.open({
      name: 'InstaDoc',
      discription: 'booking doctor',
      amount: amount,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51McR2MSACriAWWdeBeHln7lojzaJPgbxLDANWq9eIpX1OjXVL1C7YVYBwrhb2QalZuBbD36bhFKrryC1x9JfPDot00HpNR1MIV',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }
  checkingslot(item: string) {
    if (this.bookedSlots.includes(item)) {
      console.log(item+"find");
      
      return true;
    } else {
      return false;
    }
  }
  checkingAvailability(item: string) {
    if (this.busySlots !== undefined) {
      if (this.busySlots.includes(item)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
