import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthCheckService } from './auth-check.service'; 
@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor {

  constructor(private authCheck: AuthCheckService) { }

  intercept(req: any, next: any) {
    let authService = this.authCheck.getToken()

    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authService
      }
    })
    return next.handle(tokenizedReq)
  }
}
