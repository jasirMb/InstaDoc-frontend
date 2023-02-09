import { Component } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {
  constructor(private adminService: AdminServiceService,private router: Router) { }
  isMenuCollapsed = false;
  mobilenav(){
    console.log("clicked");
    
    this.isMenuCollapsed = !this.isMenuCollapsed
  }
  isLoggIn() {
    return this.adminService.isLoggedIn()
  }
  logout() {
    localStorage.removeItem('adminToken')
    this.router.navigate(['/admin'])
  }
}
