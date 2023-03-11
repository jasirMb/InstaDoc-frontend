import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthCheckService {
  admin: any = '';
  user: any = '';
  doctor: any = '';
  constructor() {}
  isAdminLoggedIn() {
    this.admin = localStorage.getItem('adminToken');
    if (this.admin) {
      console.log('its admin');

      return true;
    } else {
      return false;
    }
  }
  isUserLoggedIn() {
    this.user = localStorage.getItem('userToken');
    if (this.user) {
      console.log('its user');

      return true;
    } else {
      return false;
    }
  }
  isDoctorLoggedIn() {
    this.doctor = localStorage.getItem('doctorToken');
    if (this.doctor) {
      console.log('its doc');

      return true;
    } else {
      return false;
    }
  }
  getToken(role: string) {
    if (role === 'doctor') {
      return localStorage.getItem('doctorToken');
    } else if (role === 'admin') {
      return localStorage.getItem('adminToken');
    }else{
      return localStorage.getItem('userToken')
    }
  }
}
