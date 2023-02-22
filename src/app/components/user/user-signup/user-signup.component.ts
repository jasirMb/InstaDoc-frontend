import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { OtpPopupComponent } from './otp/otp-popup/otp-popup.component';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
})
export class UserSignupComponent implements OnInit {
  signupSubmitted: boolean = false;
  passhide: boolean = true;
  passvalidtion: boolean = true;
  errorMessage = '';
  userLoggedIn: boolean | string = false;
  public signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,private dialogRef: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        userName: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        ConfirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.mustmatch('password', 'ConfirmPassword'),
      }
    );
  }
  get allControls(): any {
    return this.signupForm.controls;
  }
  onsignupSubmit(signupValues: FormGroup) {
    this.signupSubmitted = true;
    // console.log(signupValues.controls.ConfirmPassword.errors);
    // console.log(this.allControls);
  }
  mustmatch(password: string, ConfirmPassword: string) {
    return (FormGroup: FormGroup) => {
      const passwordControl = FormGroup.controls[password];
      const ConfirmPasswordControl = FormGroup.controls[ConfirmPassword];

      if (
        ConfirmPasswordControl.errors &&
        !ConfirmPasswordControl.errors['mustmatch']
      ) {
        console.log('somehtinf else');
        return;
      }
      if (passwordControl.value !== ConfirmPasswordControl.value) {
        ConfirmPasswordControl.setErrors({ mustmatched: true });
        console.log('mismatch');
      } else {
        ConfirmPasswordControl.setErrors(null);
        console.log('pakka');
      }
    };
  }
  onSubmit() {
    console.log(this.signupForm.valid);
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      const data = {
        username: formData.userName,
        email: formData.email,
        password: formData.password,
      };
      console.log(formData.email + 'heyyyy');

      this.userLoggedIn = this.signupForm.controls.userName.value;
      this.userService.signUp(data).subscribe({
        next: (response: any) => {
            this.dialogRef.open(OtpPopupComponent, {
              data: "hai",
            });
            
            localStorage.setItem('token', "" + response.token)
            localStorage.setItem('role', 'user');
            // this.router.navigate(['']);
          },
        error: (err) => {
            console.log(err);
            
            this.errorMessage = err.error;
            this.toastr.error(this.errorMessage)
          }
        });
    } else {
      return;
    }
  }
  test(){
    this.dialogRef.open(OtpPopupComponent, {
      data: "hai",
    });
  }
}
