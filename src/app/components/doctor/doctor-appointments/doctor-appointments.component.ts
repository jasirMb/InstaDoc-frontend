import { Component, OnInit, ViewChild } from '@angular/core';
import { doctorService } from 'src/app/services/doctor/doctor.service';
import { Router } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css'],
})
export class DoctorAppointmentsComponent implements OnInit {
  allAppointments: any = [];
  newAppointments: any = [];
  approved :boolean;
  rejected : boolean;
  displayedColumns: string[] = [
    'id',
    'patient',
    'email',
    'date',
    'time',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private doctorService: doctorService,
    private dialogRef: MatDialog,private toastr: ToastrService, private router: Router,
   
  ) {}
  ngOnInit() {
    this.doctorService.allAppointments().subscribe(
      (response: any) => {
        console.log(response);

        
        this.allAppointments = response.appointments;
        this.newAppointments = response.newAppointments;
        this.dataSource = new MatTableDataSource(this.allAppointments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        return;
      }, (err :any)=>{
        console.log("this is http error");
          
         if(err.status === 401 || err.status === 403 ){
          this.router.navigate(['doctor/login']);
         }
      },
      
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  
  
  
  callGetAppointments(){
    this.doctorService.allAppointments().subscribe(
      (response: any) => {
        console.log(response);
        this.allAppointments = response.appointments;
        this.newAppointments = response.newAppointments;
        this.dataSource = new MatTableDataSource(this.allAppointments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        return;
      },(err :any)=>{
        console.log("this is http error");
          
         if(err.status === 401 || err.status === 403 ){
          console.log("this is http error");
          
          this.router.navigate(['doctor/login']);
         }else{
          console.log("lse errrrrrrrrrrrr");
          
         }
      },
     
    );
  }
  cancel (id : string) {
    this.doctorService.cancel(id).subscribe((response: any) => {
      console.log(response);
      this.callGetAppointments();
      this.toastr.success('Action successfull');
    });
  }
  approve(id: string): void {
    this.approved = true
    this.rejected = false
    this.doctorService.approveAppointment(id,this.approved,this.rejected).subscribe((response: any) => {
      console.log(response);
      this.callGetAppointments();
      this.toastr.success('Doctor approved successfully');
    });
  }
  reject(id : string) : void {
    this.approved = false
    this.rejected = true
    this.doctorService.approveAppointment(id,this.approved,this.rejected).subscribe((response: any) => {
      console.log(response);
      this.callGetAppointments();
      this.toastr.success('Doctor rejected successfully');
    });
  }
}
