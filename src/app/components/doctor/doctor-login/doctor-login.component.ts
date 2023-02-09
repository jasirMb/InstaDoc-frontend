import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { doctorService } from 'src/app/services/doctor/doctor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent implements OnInit {
  loginSubmitted: boolean = false;
  passhide: boolean = true;
  public loginForm!: FormGroup;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private doctorService: doctorService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  get allControls(): any {
    return this.loginForm.controls;
  }
  onLoginSubmit(loginValues: FormGroup) {
    this.loginSubmitted = true;
    console.log(loginValues);
    console.log(this.allControls);
  }
  onSubmit() {
    console.log(this.loginForm.valid);

    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const data = {
        email: formData.email,
        password: formData.password,
      };
      console.log(data);
      
      this.doctorService.login(data).subscribe(
        (response: any) => {
          this.toastr.success('login success');
          localStorage.setItem('userToken', '' + response);
          this.router.navigate(['/doctor']);
        },
        (err) => {
          this.errorMessage = err.error;
          this.toastr.error(this.errorMessage);
          console.log(this.errorMessage);
        }
      );
    } else {
      return;
    }
  }
}
