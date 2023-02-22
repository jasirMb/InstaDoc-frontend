import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-doctor',
  templateUrl: './single-doctor.component.html',
  styleUrls: ['./single-doctor.component.css']
})
export class SingleDoctorComponent implements OnInit {
  doctorId: string | null ;
  doctor: any;

  constructor(private route: ActivatedRoute, private userServive : UserService){ }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.doctorId = params.get('myParam');
      console.log(this.doctorId);
      this.userServive .getDoctor(this.doctorId)?.subscribe({
        next:(response) => {
         console.log(response);
         
          this.doctor = response
          console.log(this.doctor);
          
        },
       error: (err) => {
          console.log(err);
          
          // this.errorMessage = err.error;
          // this.toastr.error(this.errorMessage);
          // console.log(this.errorMessage);
        }
    });
      
    });
    
    
    
  }
  
}