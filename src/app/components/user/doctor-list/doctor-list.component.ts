import { Component,OnInit,Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
interface doctors {
  _id: string;
  doctorName: string;
  city: string;
  experience: number;
  specialization : string

}
@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})

export class DoctorListComponent {
  @Input() pageSize: number = 10;
  pageIndex: number = 0;
  doctors : Array<doctors> = []
  specializations : Array<String> = []
 constructor (private userService : UserService){
 
 }

  ngOnInit() {
   
    this.userService.getDoctors().subscribe(
      (response: any) => {
        console.log(response);
        
        this.doctors = response.doctors
        this.specializations = response.specialization
        
        
        // this.pendingDoctors = response.pendingDoctors;
        // this.allDoctors = response.allDoctors;
        // this.dataSource = new MatTableDataSource(this.allDoctors);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
        return;
      },
      // (err) => {}
    );
  }
  get totalItems(): number {
    return this.doctors.length;
  }
  get visibleItems():  Array<doctors> {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.doctors.slice(startIndex, endIndex);
  }
  
  pageChanged(event: any): void {
    this.pageIndex = event.pageIndex;
  }
  // singleDoctor(id : string) {
  //   console.log(id);
  //   this.userService.getSingleDoctor(id)
    
  // }
}

