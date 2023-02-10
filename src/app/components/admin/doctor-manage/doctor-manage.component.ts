import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DetailsComponent } from './detailsPop-up/details/details.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-doctor-manage',
  templateUrl: './doctor-manage.component.html',
  styleUrls: ['./doctor-manage.component.css'],
})
export class DoctorManageComponent implements OnInit {
  pendingDoctors: any = [];
  allDoctors: any = [];
  approved :boolean = true
  rejected :boolean = true
  displayedColumns: string[] = [
    'id',
    'doctorName',
    'city',
    'experience',
    'specialization',
    'doctorId',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private adminService: AdminServiceService,
    private dialogRef: MatDialog,private toastr: ToastrService
  ) {}

   ngOnInit() {
    this.adminService.getDoctors().subscribe(
      (response: any) => {
        console.log(response);

        this.pendingDoctors = response.pendingDoctors;
        this.allDoctors = response.allDoctors;
        this.dataSource = new MatTableDataSource(this.allDoctors);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        return;
      },
      (err) => {}
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(doctor: object): void {
    console.log(doctor);
    this.dialogRef.open(DetailsComponent, {
      data: doctor,
    });
  }
  approve(id: string): void {
    this.approved = true
    this.rejected = false
    this.adminService.approveDoctor(id,this.approved,this.rejected).subscribe((response: any) => {
      console.log(response);
      this.callGetDoctors();
      this.toastr.success('Doctor approved successfully');
    });
  }
  reject(id : string) : void {
    this.approved = false
    this.rejected = true
    this.adminService.approveDoctor(id,this.approved,this.rejected).subscribe((response: any) => {
      console.log(response);
      this.callGetDoctors();
      this.toastr.success('Doctor rejected successfully');
    });
  }
  callGetDoctors(){
    this.adminService.getDoctors().subscribe(
      (response: any) => {
        console.log(response);

        this.pendingDoctors = response.pendingDoctors;
        this.allDoctors = response.allDoctors;
        this.dataSource = new MatTableDataSource(this.allDoctors);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        return;
      },
      (err) => {}
    );
  }
  accessChange (id : string) {
    this.adminService.acccessChanger(id).subscribe((response: any) => {
      console.log(response);
      this.callGetDoctors();
      this.toastr.success('Action successfull');
    });
  }
}
