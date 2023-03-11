import { Component, OnInit } from '@angular/core';
import { doctorService } from 'src/app/services/doctor/doctor.service';
@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit{
  doctor :any = {}
constructor(private doctorService : doctorService){}
ngOnInit(): void {
  this.doctorService.getDoctor().subscribe((response) => {
    
    this.doctor = response
    console.log(this.doctor.doctorName);
    
  })
}
}
