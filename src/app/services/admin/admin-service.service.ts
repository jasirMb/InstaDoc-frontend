import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
approveDoctor(id : string,approved:boolean,rejected : boolean) {  
  return this.http.put(this.apiUrl + "/admin/doctors/status",{id,approved,rejected})
}
acccessChanger(id : string){
  return this.http.patch(this.apiUrl + "/admin/doctors/access",{id})
}

}

