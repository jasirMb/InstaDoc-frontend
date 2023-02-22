import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthCheckService {
  role : any = ""
  constructor() { }
  isAdminLoggedIn() {
    this.role = localStorage.getItem('role')
    if(this.role === "admin"){
      console.log("its admin");
      
      return true
    }else{
      return false
    }
     
  }
  isUserLoggedIn() {
    this.role = localStorage.getItem('role')
    if(this.role === "user"){
      console.log("its user");
      
      return true
    }else{
      return false
    }
     
  }
  getToken(){
    return localStorage.getItem('token')
  }
}
