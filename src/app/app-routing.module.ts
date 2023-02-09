import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/user/home/home.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { DoctorHomeComponent } from './components/doctor/doctor-home/doctor-home.component';
import { DoctorNavComponent } from './components/doctor/doctor-nav/doctor-nav.component';
import { DoctorLoginComponent } from './components/doctor/doctor-login/doctor-login.component';
import { DoctorSignupComponent } from './components/doctor/doctor-signup/doctor-signup.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { DoctorManageComponent } from './components/admin/doctor-manage/doctor-manage.component';


const routes: Routes = [
  {path : '',component : HomeComponent},
  {path : 'login',component : UserLoginComponent},
  {path : 'doctor',component : DoctorHomeComponent},
  {path : 'doctor/login',component : DoctorLoginComponent},
  {path : 'doctor/signup',component : DoctorSignupComponent},
  {path : 'admin',component : AdminLoginComponent},
  {path : 'admin/home',component : AdminHomeComponent},
  {path : 'admin/doctors',component : DoctorManageComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
