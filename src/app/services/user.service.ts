import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000'
  constructor(private http : HttpClient) { }
  signUp(data : object){
    return this.http.post(this.apiUrl + "/register", data)
  }
  login(data : object) {
    return this.http.post(this.apiUrl + "/login", data)
  }
  isLoggedIn() {
    return !!localStorage.getItem('userToken')
  }
  otpVerify( data: object,token : String){
    console.log(data+"its from service");
   let  values = {
      data,
      token
    }
    return this.http.post(this.apiUrl + "/otpVerify", values)
  
  }
}
