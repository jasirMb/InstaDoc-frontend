import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  signUp(data: object) {
    return this.http.post(this.apiUrl + '/register', data);
  }
  login(data: object) {
    return this.http.post(this.apiUrl + '/login', data);
  }
  isLoggedIn() {
    let role :string |null = localStorage.getItem('userToken');
    if(role){
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
    return localStorage.getItem('userToken');
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
  allAppointments () {
    return this.http.get(this.apiUrl + "/appointments")
  } 
  cancel(id : string) {
    
    return this.http.patch(this.apiUrl + "/cancel-appointment", {id})
  }
  recordUpload (fd :any){
   
    const formData = new FormData();
    formData.append('file',fd);
   
    console.log(formData.get('file'))
    return this.http.post(this.apiUrl + "/record-upload", formData)
  }
  getDocuments (){
    return this.http.get(this.apiUrl + "/get-records")
  }
  removeRecord(path :string) {
    return this.http.patch(this.apiUrl + "/remove-records",{path})
  }
  onlineDoctor () {
    return this.http.get(this.apiUrl + "/online-doctor")
  }
  
}
