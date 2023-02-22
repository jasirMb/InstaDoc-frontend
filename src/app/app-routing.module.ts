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
import { UserManageComponent } from './components/admin/user-manage/user-manage.component';
import { SingleDoctorComponent } from './components/user/single-doctor/single-doctor.component'; 
import { CheckoutComponent } from './components/user/checkout/checkout.component';
import { AdminAuthGuard } from './guard/admin-auth.guard';
import { UserAuthGuard } from './guard/user-auth.guard';
import { DoctorListComponent } from './components/user/doctor-list/doctor-list.component';
import { MyBookingComponent } from './components/user/my-booking/my-booking.component';


const routes: Routes = [
  {path : '',component : HomeComponent},
  {path : 'login',component : UserLoginComponent},
  {path : 'doctors',component : DoctorListComponent},
  {path : 'single-doctor/:myParam',component : SingleDoctorComponent,canActivate: [UserAuthGuard]},
  {path : 'checkout',component : CheckoutComponent},
  {path : 'my_appointments',component : MyBookingComponent},
  {path : 'doctor/login',component : DoctorLoginComponent},
  {path : 'doctor/signup',component : DoctorSignupComponent},
  {path : 'doctor',component : DoctorHomeComponent},
  {path : 'admin/login',component : AdminLoginComponent},
  {path : 'admin',component : AdminHomeComponent,
  canActivate: [AdminAuthGuard]
},
  {path : 'admin/doctors',component : DoctorManageComponent,
  canActivate: [AdminAuthGuard]
},
  {path : 'admin/users',component : UserManageComponent,
  canActivate: [AdminAuthGuard]
},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
