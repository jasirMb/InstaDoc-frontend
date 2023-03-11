import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class doctorService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  login(data: object) {
    console.log('on admin service');

    return this.http.post(this.apiUrl + '/doctor/login', data);
  }
  signUp(data: object) {
    return this.http.post(this.apiUrl + '/doctor/register', data);
  }
  isLoggedIn() {
    return !!localStorage.getItem('doctorToken');
  }
  getDocAppointments(date: string|null) {
    console.log(date);

    return this.http.post(this.apiUrl + '/doctor/schedule', { date });
  }
  cancelAppointment(date: string|null, time: string) {
    const details = {
      date,
      time,
    };
    console.log(details.date);
    return this.http.patch(this.apiUrl + '/doctor/cancel-appointment', details);
  }
  notAvailable(date: string|null, time: string) {
    console.log(date);
    
    const details = {
      date,
      time,
    };
    return this.http.post(this.apiUrl + "/doctor/unavailable",details)
  }
  allAppointments () {
    return this.http.get(this.apiUrl + "/doctor/appointments")
  } 
  cancel(id : string) {
    
    return this.http.patch(this.apiUrl + "/doctor/cancel-appointment", {id})
  }
  getDoctor(){
    return this.http.get(this.apiUrl + "/doctor/doctor-profile")
  }
  allpatients () {
    return this.http.get(this.apiUrl + "/doctor/patients")
  }
  approveAppointment(id : string,approved:boolean,rejected : boolean) {  
    return this.http.put(this.apiUrl + "/doctor/appointment/status",{id,approved,rejected})
  }
  logout() {
    console.log("letlogout");
    
    return this.http.patch(this.apiUrl + "/doctor/logout",{})
  }
  
 }
