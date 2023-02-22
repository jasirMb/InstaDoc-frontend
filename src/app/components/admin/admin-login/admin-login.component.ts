import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginSubmitted: boolean = false;
  passhide: boolean = true;
  public loginForm!: FormGroup;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminServiceService,
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
      
      this.adminService.login(data).subscribe(
        (response: any) => {
          this.toastr.success('login success');
          localStorage.setItem('token', '' + response.token);
          localStorage.setItem('role', 'admin' );
          this.router.navigate(['admin']);
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
