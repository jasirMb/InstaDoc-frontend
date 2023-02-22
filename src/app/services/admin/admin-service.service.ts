import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  role : any =""
  private apiUrl = 'http://localhost:3000'
  constructor(private http : HttpClient) {} 
 

login(data : object) {
  return this.http.post(this.apiUrl + "/admin/login", data)
}
isLoggedIn() {
  this.role = localStorage.getItem('role')
  if(this.role === "admin"){
    console.log("its admin");
    
    return true
  }else{
    return false
  }
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
allUsers(){
 
  return this.http.get(this.apiUrl + "/admin/users")
}
userAcccessChanger (id : string){
  return this.http.patch(this.apiUrl + "/admin/users/access",{id})
}

}

