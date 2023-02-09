import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { doctorService } from 'src/app/services/doctor/doctor.service';
import { Router } from '@angular/router';

interface specializations {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-doctor-signup',
  templateUrl: './doctor-signup.component.html',
  styleUrls: ['./doctor-signup.component.css'],
})
export class DoctorSignupComponent implements OnInit {
  signupSubmitted: boolean = false;
  passhide: boolean = true;
  public signupForm!: FormGroup;
  errorMessage = '';
  //doctor speoializations......................................../
  specialization: specializations[] = [
    { value: 'Allergists', viewValue: 'Allergist' },
    { value: 'Cardiologist', viewValue: 'Cardiologist' },
    { value: 'Dermatologist', viewValue: 'Dermatologist' },
    { value: 'Family Physician', viewValue: 'Family Physician' },
    { value: 'Nephrologist', viewValue: 'Nephrologist' },
    { value: 'Neurologist', viewValue: 'Neurologist' },
    { value: 'Oncologist', viewValue: 'Oncologist' },
    { value: 'ophthalmologist', viewValue: 'ophthalmologist' },
    { value: 'Pediatrician', viewValue: 'Pediatrician' },
    { value: 'Physiatrist', viewValue: 'Physiatrist' },
    { value: 'Psychiatrist', viewValue: 'Psychiatrist' },
  ];
  constructor(private fb: FormBuilder, private toastr: ToastrService,private doctorService: doctorService,private router: Router,) {}
  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        specializations: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        city: ['', [Validators.required]],
        doctorId: ['', [Validators.required]],
        experience: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        ConfirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.mustmatch('password', 'ConfirmPassword'),
      }
    );
  }
  get allControls(): any {
    // console.log(this.signupForm);
    return this.signupForm.controls;
  }
  onsignupSubmit(signupValues: FormGroup) {
    this.signupSubmitted = true;
    // console.log(signupValues.controls.ConfirmPassword.errors);
    console.log(this.allControls);
  }
  onSubmit() {
    console.log(this.signupForm.valid);
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      const data = {
        doctorName: formData.name,
        email: formData.email,
        specialization: formData.specializations,
        gender : formData.gender,
        city : formData.city,
        experience : formData.experience,
        password : formData.password
      };
      console.log(data);
      this.doctorService.signUp(data).subscribe(
        (response: object) => {
          this.toastr.success('Account created succesfully..',)
          localStorage.setItem('userToken', "" + response)
          this.router.navigate(['/doctor']);
        },
        (err) => {
          console.log(err);
          
          this.errorMessage = err.error;
          this.toastr.error(this.errorMessage)
        }
      );
     
    } else {
      // if(this.allControls?.email?.errors?.email){
      //   this.toastr.error("invalid Email Id")
      // }
      this.toastr.error('Please fill required fields');
      if(this.allControls?.password?.errors?.minlength ){
        this.toastr.error('password should contain 8 character');
      }
    }
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
  onlyNumber(event:any):boolean {
    const charcode = (event.which)?event.which : event.keyCode;
    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      console.log("restricted"+charcode);
      return false
      
    }
    return true
  }
}
