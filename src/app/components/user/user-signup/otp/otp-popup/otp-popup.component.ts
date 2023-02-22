import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
@Component({
  selector: 'app-otp-popup',
  templateUrl: './otp-popup.component.html',
  styleUrls: ['./otp-popup.component.css'],
})
export class OtpPopupComponent {
  public loginForm!: FormGroup;
  otperror: boolean = false;
  errormsg: boolean = false;
  token: any = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private dialogRef: MatDialog
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      otp1: ['', [Validators.required]],
      otp2: ['', [Validators.required]],
      otp3: ['', [Validators.required]],
      otp4: ['', [Validators.required]],
    });
    
  }
  get allControls(): any {
    return this.loginForm.controls;
  }
  onLoginSubmit(loginValues: FormGroup) {
    console.log(loginValues);
    console.log(this.allControls);
  }
  onSubmit() {
    console.log(this.loginForm.valid);

    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const data = {
        otp1: formData.otp1,
        otp2: formData.otp2,
        otp3: formData.otp3,
        otp4: formData.otp4,
      };
      console.log(formData.otp3 + 'heyyyy');
      this.token = localStorage.getItem('token');
      this.userService.otpVerify(data, this.token).subscribe(
        (response: object) => {
          this.toastr.success('otp verified succesfully');
          console.log(response);

          this.router.navigate(['']);
          this.dialogRef.closeAll()
        },
        (err: any) => {
          console.log(err);
          this.otperror = true;

          this.toastr.error('otp dosent match');
        }
      );
    } else {
      this.errormsg = true;
    }
  }
  resendOtp (){
    this.token = localStorage.getItem('token');
    console.log(this.token);
    
    this.userService.resendOtp(this.token).subscribe((response) =>{
      if(response){
        this.toastr.success("otp is resended")
      }
    })
  }
}
