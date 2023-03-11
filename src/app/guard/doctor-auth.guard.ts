import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthCheckService } from '../services/shared/auth-check.service';


@Injectable({
  providedIn: 'root',
})
export class DoctorAuthGuard implements CanActivate {
  constructor(private authService : AuthCheckService, private router : Router){}
  canActivate() :boolean {
    if(this.authService.isDoctorLoggedIn()){
      return true;
    }else {
      this.router.navigate(['/doctor/login'])
      return false
    }
  }
}
