import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
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
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent implements OnInit {
  
  allUsers: any = [];
  approved :boolean = true
  rejected :boolean = true
  currentPath :string = ""
  displayedColumns: string[] = [
    'id',
    'username',
    'email',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private adminService: AdminServiceService,
    private dialogRef: MatDialog,private toastr: ToastrService, private router: Router,
   
  ) {}

   ngOnInit() {
    this.adminService.allUsers().subscribe(
      (response: any) => {
        console.log(response);

        
        this.allUsers = response;
        this.dataSource = new MatTableDataSource(this.allUsers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        return;
      }, (err)=>{
        console.log("this is http error");
          
         if(err.status === 401 || err.status === 403 ){
          this.router.navigate(['admin/login']);
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
  
  
  
  
  callGetUsers(){
    this.adminService.allUsers().subscribe(
      (response: any) => {
        console.log(response);
        this.allUsers = response;
        this.dataSource = new MatTableDataSource(this.allUsers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        return;
      },(err)=>{
        console.log("this is http error");
          
         if(err.status === 401 || err.status === 403 ){
          console.log("this is http error");
          
          this.router.navigate(['admin/login']);
         }else{
          console.log("lse errrrrrrrrrrrr");
          
         }
      },
     
    );
  }
  accessChange (id : string) {
    this.adminService.userAcccessChanger(id).subscribe((response: any) => {
      console.log(response);
      this.callGetUsers();
      this.toastr.success('Action successfull');
    });
  }
}

