import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service'; 
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
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css'],
})
export class MyBookingComponent implements OnInit {
  allAppointments: any = [];
  displayedColumns: string[] = [
    'id',
    'doctor',
    'speciliazation',
    'date',
    'time',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private UserService: UserService,
    private dialogRef: MatDialog,private toastr: ToastrService, private router: Router,
   
  ) {}
  ngOnInit() {
    this.UserService.allAppointments().subscribe(
      (response: any) => {
        console.log(response);

        
        this.allAppointments = response;
        this.dataSource = new MatTableDataSource(this.allAppointments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        return;
      }, (err :any)=>{
        console.log(err);
          
         if(err.status === 401 || err.status === 403 ){
          this.router.navigate(['/login']);
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
    this.UserService.allAppointments().subscribe(
      (response: any) => {
        console.log(response)
        this.allAppointments = response;
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
    this.UserService.cancel(id).subscribe((response: any) => {
      console.log(response);
      this.callGetAppointments();
      this.toastr.success('Action successfull');
    });
  }
}
