import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent {
  constructor(private UserService: UserService,private router: Router) { }
  isMenuCollapsed = false;
  mobilenav(){
    console.log("clicked");
    
    this.isMenuCollapsed = !this.isMenuCollapsed
  }
  isLoggIn() {
    return this.UserService.isLoggedIn()
  }
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    this.router.navigate(['/login'])
  }
}
