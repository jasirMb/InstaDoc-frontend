import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// user components.....................//
import { HomeComponent } from './components/user/home/home.component';
import { SingleDoctorComponent } from './components/user/single-doctor/single-doctor.component';
import { CheckoutComponent } from './components/user/checkout/checkout.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { MyBookingComponent } from './components/user/my-booking/my-booking.component';
import { UserRecordsComponent } from './components/user/user-records/user-records.component';
import { OnlineConsultComponent } from './components/user/online-consult/online-consult.component';
import { ChatPageComponent } from './components/user/online-consult/chat-page/chat-page.component';
//  doctor components..................//
import { DoctorListComponent } from './components/user/doctor-list/doctor-list.component';
import { DoctorHomeComponent } from './components/doctor/doctor-home/doctor-home.component';
import { DoctorLoginComponent } from './components/doctor/doctor-login/doctor-login.component';
import { DoctorSignupComponent } from './components/doctor/doctor-signup/doctor-signup.component';
import { DoctorAppointmentsComponent } from './components/doctor/doctor-appointments/doctor-appointments.component';
import { DoctorProfileComponent } from './components/doctor/doctor-profile/doctor-profile.component';
import { PatientsComponent } from './components/doctor/patients/patients.component';
//  admin componets...................//
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { DoctorManageComponent } from './components/admin/doctor-manage/doctor-manage.component';
import { UserManageComponent } from './components/admin/user-manage/user-manage.component';
//  services ...........................//
import { AdminAuthGuard } from './guard/admin-auth.guard';
import { UserAuthGuard } from './guard/user-auth.guard';
import { DoctorAuthGuard } from './guard/doctor-auth.guard';

const routes: Routes = [
  // user routes..............................//
  { path: '', component: HomeComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'doctors', component: DoctorListComponent },
  {
    path: 'single-doctor/:myParam',
    component: SingleDoctorComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'my_appointments',
    component: MyBookingComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'my_records',
    component: UserRecordsComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'online_consult',
    component: OnlineConsultComponent,
    canActivate: [UserAuthGuard],
  },
  {
     path: 'chat/:type/:doctorId', component: ChatPageComponent ,
    canActivate: [UserAuthGuard],
  },
  // doctor routes...........................//
  { path: 'doctor/login', component: DoctorLoginComponent },
  { path: 'doctor/signup', component: DoctorSignupComponent },
  { path: 'doctor', component: DoctorHomeComponent,canActivate : [DoctorAuthGuard] },
  { path: 'doctor/appointments', component : DoctorAppointmentsComponent,canActivate : [DoctorAuthGuard]},
  { path: 'doctor/profile', component : DoctorProfileComponent,canActivate : [DoctorAuthGuard]},
  { path: 'doctor/patients', component : PatientsComponent,canActivate : [DoctorAuthGuard]},
//   {
//     path: 'chat/:type/:userId', component: ChatPageComponent ,
//     canActivate : [DoctorAuthGuard]
//  },
  // Admin routes............................//
  { path: 'admin/login', component: AdminLoginComponent },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'admin/doctors',
    component: DoctorManageComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'admin/users',
    component: UserManageComponent,
    canActivate: [AdminAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
