import { NgModule } from '@angular/core';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
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
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


import { ToastrModule } from 'ngx-toastr';


//........................forms.............................................//
import { ReactiveFormsModule } from '@angular/forms';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';
import { HomeBannerComponent } from './components/user/home-banner/home-banner.component';
import { ServicecardComponent } from './components/user/home/servicecard/servicecard.component';

//........................services.............................................//
import { UserService } from './services/user.service';
import { AdminServiceService } from './services/admin/admin-service.service';

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
    
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    MatPaginatorModule,
    MatSortModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground : true
      
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-center-center' 
   }),
   MatDialogModule,

  ],
  
  providers: [UserService,AdminServiceService,doctorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
