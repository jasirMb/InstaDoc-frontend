import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthCheckService } from './auth-check.service'; 
@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor {
  
  constructor(private authCheck: AuthCheckService) { }

  intercept(req: any, next: any) {
    const role = req.url.split('/')[3]
    console.log(role);
    
    let authService = this.authCheck.getToken(role)

    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authService
      }
    })
    return next.handle(tokenizedReq)
  }
}
