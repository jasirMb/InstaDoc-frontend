import { Component } from '@angular/core';
import { doctorService } from 'src/app/services/doctor/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-nav',
  templateUrl: './doctor-nav.component.html',
  styleUrls: ['./doctor-nav.component.css']
})
export class DoctorNavComponent {
  constructor(
    private router: Router,
    private doctorService: doctorService,
    
  ) {}
  isMenuCollapsed = false;
  mobilenav(){
    console.log("clicked");
    
    this.isMenuCollapsed = !this.isMenuCollapsed
  }
  isLoggIn() {
    return this.doctorService.isLoggedIn()
  }
  logout() {
   
    this.doctorService.logout().subscribe((response) =>{
      console.log(response);
      localStorage.removeItem('doctorToken')
      this.router.navigate(['/doctor/login'])
    })
  }
}
