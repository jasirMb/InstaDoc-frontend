import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private apiUrl = 'http://localhost:3000'
  constructor(private http : HttpClient) {} 
 

login(data : object) {
  return this.http.post(this.apiUrl + "/admin/login", data)
}
isLoggedIn() {
  return !!localStorage.getItem('adminToken')
}
getDoctors(){
 
  return this.http.get(this.apiUrl + "/admin/doctors")
}
approveDoctor(id : string) {
  console.log("onn serviceeee");
  
  return this.http.patch(this.apiUrl + "/admin/doctors/status", id)
}

}

