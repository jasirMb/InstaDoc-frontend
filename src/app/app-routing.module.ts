import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/user/home/home.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';


const routes: Routes = [
  {path : '',component : HomeComponent},
  {path : 'login',component : UserLoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
