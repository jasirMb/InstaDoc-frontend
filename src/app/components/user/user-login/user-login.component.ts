import { Component,OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginSubmitted : boolean = false
  passhide : boolean = true
  public loginForm! : FormGroup
  constructor(private fb: FormBuilder){ }
   ngOnInit(): void {
    
    
     this.loginForm = this.fb.group({
      email  : ["",[Validators.required,Validators.email]],
      password : ["",[Validators.required,Validators.minLength(8)]]
     })
   }
   get allControls():any{
    return this.loginForm.controls
   }
   onLoginSubmit(loginValues : FormGroup ){
    this.loginSubmitted = true
    console.log(loginValues);
    console.log(this.allControls);
   }
    
  }



