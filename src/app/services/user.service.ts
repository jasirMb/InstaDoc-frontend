import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  role :string |null
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  signUp(data: object) {
    return this.http.post(this.apiUrl + '/register', data);
  }
  login(data: object) {
    return this.http.post(this.apiUrl + '/login', data);
  }
  isLoggedIn() {
    this.role = localStorage.getItem('role');
    if(this.role === "user"){
      return true 
    }else{
      return false
    }
  }
  otpVerify(data: object, token: String) {
    console.log(data + 'its from service');
    let values = {
      data,
      token,
    };
    return this.http.post(this.apiUrl + '/otpVerify', values);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getDoctors() {
    return this.http.get(this.apiUrl + '/doctors');
  }
  getDoctor(id: String | null) {
    return this.http.get(this.apiUrl + `/single-doctor?value=${id}`);
  }
  checkout(token: string) {
    console.log('inservice');

    return this.http.post(this.apiUrl + '/checkout', token);
  }
  createOrder (data : object) {
    return this.http.post(this.apiUrl + '/order', data);
  }
  getDocAppointments (data : object){
    console.log(data);
    
    return this.http.post(this.apiUrl + '/slotcheck', data);
  }
  resendOtp(token : string) {
    return this.http.patch(this.apiUrl + '/resendotp', {token});
  }
}
