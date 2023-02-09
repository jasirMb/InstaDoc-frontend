import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class doctorService{
  private apiUrl = 'http://localhost:3000'
  constructor(private http : HttpClient) {} 
 

login(data : object) {
  console.log("on admin service");
  
  return this.http.post(this.apiUrl + "/doctor/login", data)
}
signUp(data : object){
  return this.http.post(this.apiUrl + "/doctor/register", data)
}
isLoggedIn() {
  return !!localStorage.getItem('doctorToken')
}
}
