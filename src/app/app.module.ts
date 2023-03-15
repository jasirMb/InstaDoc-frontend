import { NgModule } from '@angular/core';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//...................... compoonents......................................//
import { AppComponent } from './app.component';
import { HomeComponent } from './components/user/home/home.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserNavComponent } from './components/user/user-nav/user-nav.component';
// ......................material........................................//
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ToastrModule } from 'ngx-toastr';

//........................forms.............................................//
import { ReactiveFormsModule } from '@angular/forms';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';
import { HomeBannerComponent } from './components/user/home-banner/home-banner.component';
import { ServicecardComponent } from './components/user/home/servicecard/servicecard.component';

//........................services.............................................//
import { UserService } from './services/user.service';
import { AdminServiceService } from './services/admin/admin-service.service';
import { TokenIntercepterService } from './services/shared/token-interceptor.service';
import { BlockIntercepterService } from './services/block-intercepter.service';
import { AuthCheckService } from './services/shared/auth-check.service';

import { DoctorHomeComponent } from './components/doctor/doctor-home/doctor-home.component';
import { DoctorNavComponent } from './components/doctor/doctor-nav/doctor-nav.component';
import { DoctorLoginComponent } from './components/doctor/doctor-login/doctor-login.component';
import { DoctorSignupComponent } from './components/doctor/doctor-signup/doctor-signup.component';
import { doctorService } from './services/doctor/doctor.service';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminNavComponent } from './components/admin/admin-nav/admin-nav.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { DoctorManageComponent } from './components/admin/doctor-manage/doctor-manage.component';
import { DetailsComponent } from './components/admin/doctor-manage/detailsPop-up/details/details.component';
import { OtpPopupComponent } from './components/user/user-signup/otp/otp-popup/otp-popup.component';
import { UserManageComponent } from './components/admin/user-manage/user-manage.component';
import { DoctorListComponent } from './components/user/doctor-list/doctor-list.component';
import { SingleDoctorComponent } from './components/user/single-doctor/single-doctor.component';
import { SlotBookComponent } from './components/user/slot-book/slot-book.component';
import { CheckoutComponent } from './components/user/checkout/checkout.component';
import { YesNoPopupComponent } from './components/user/yes-no-popup/yes-no-popup.component';
import { MyBookingComponent } from './components/user/my-booking/my-booking.component';
import { DoctorScheduleComponent } from './components/doctor/doctor-schedule/doctor-schedule.component';
import { DoctorAppointmentsComponent } from './components/doctor/doctor-appointments/doctor-appointments.component';
import { FilterPipe } from './pipes/filter.pipe';
import { UserRecordsComponent } from './components/user/user-records/user-records.component';
import { OnlineConsultComponent } from './components/user/online-consult/online-consult.component';
import { ChatPageComponent } from './components/user/online-consult/chat-page/chat-page.component';
import { LoadingComponent } from './components/user/loading/loading.component';
import { DoctorProfileComponent } from './components/doctor/doctor-profile/doctor-profile.component';
import { PatientsComponent } from './components/doctor/patients/patients.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserNavComponent,
    UserLoginComponent,
    UserSignupComponent,
    HomeBannerComponent,
    ServicecardComponent,
    DoctorHomeComponent,
    DoctorNavComponent,
    DoctorLoginComponent,
    DoctorSignupComponent,
    AdminHomeComponent,
    AdminNavComponent,
    AdminLoginComponent,
    DoctorManageComponent,
    DetailsComponent,
    OtpPopupComponent,
    UserManageComponent,
    DoctorListComponent,
    SingleDoctorComponent,
    SlotBookComponent,
    CheckoutComponent,
    YesNoPopupComponent,
    MyBookingComponent,
    DoctorScheduleComponent,
    DoctorAppointmentsComponent,
    FilterPipe,
    UserRecordsComponent,
    OnlineConsultComponent,
    ChatPageComponent,
    LoadingComponent,
    DoctorProfileComponent,
    PatientsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    HttpClientModule,
    MatMenuModule,
    NgxUiLoaderModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    NgxUiLoaderHttpModule.forRoot({
      exclude: [
        "http://localhost:3000/newMsg",
        "/api/logout",
        "https://external-domain.com/api/not/to/show",
      ],
      showForeground: true,
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-center-center',
    }),
    MatDialogModule,
    
  ],

  providers: [
    UserService,
    AdminServiceService,
    doctorService,
    AuthCheckService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercepterService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BlockIntercepterService,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
