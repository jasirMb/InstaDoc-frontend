import { Component,ViewChild,OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { doctorService } from 'src/app/services/doctor/doctor.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit{
  allPatients: any[] = []; // initialize as empty array
 

  constructor(private doctorService: doctorService) {}

  ngOnInit() {
    this.doctorService.allpatients().subscribe(
      (response: any) => {
        console.log(response);
        this.allPatients = response
      }, (err :any)=>{
        console.log("this is http error");
          
         if(err.status === 401 || err.status === 403 ){
          // this.router.navigate(['doctor/login']);
         }
      })
    
  }

  
  
}
