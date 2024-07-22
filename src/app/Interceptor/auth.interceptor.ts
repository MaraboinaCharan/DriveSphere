import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceService } from '../Services/service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor( private servicesService:ServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userToken = localStorage.getItem('mytoken')
   
      const authReq=request.clone({
        setHeaders: {
          'authorization': `Bearer ${userToken}`
        }
      })
    
    return next.handle(authReq);
  }

}