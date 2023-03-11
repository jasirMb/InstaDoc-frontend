import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthCheckService } from './shared/auth-check.service';

@Injectable({
  providedIn: 'root',
})
export class BlockIntercepterService implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("on http interceptor");
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Unauthorized request:', error);
        const role = req.url.split('/')[3]
        console.log(role);
        if (error.status === 401) {
          if(role === "admin"){
            console.error('Unauthorized request:', error);
            this.router.navigate(['admin/login']);
          }else if (role === "doctor"){
            console.error('Unauthorized request:', error);
          this.router.navigate(['doctor/login']);
          }else{
            console.log("user");
            
            this.router.navigate(['/login']);
          }
          
        }
        return throwError(() => error);
      })
    );
  }
}
