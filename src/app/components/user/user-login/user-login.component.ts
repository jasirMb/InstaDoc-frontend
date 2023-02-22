import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  loginSubmitted: boolean = false;
  passhide: boolean = true;
  public loginForm!: FormGroup;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
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
      this.userService.login(data).subscribe(
        (response: any) => {
          this.toastr.success('login success');
          localStorage.setItem('token', '' + response.token);
          localStorage.setItem('role', 'user');
          this.router.navigate(['']);
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
