import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AuthCheckService } from '../services/shared/auth-check.service'; 

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthCheckService, private router: Router) { }
  canActivate(){
    if (this.authService.isAdminLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/admin/login'])
      return false
    }
  }
  
}
