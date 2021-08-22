import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from 'src/services/account.service';
import { User } from 'src/models/user.model';
import { take } from 'rxjs/operators';
import { Login } from 'src/models/login.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: Login;

    this.accountService.getCurrentUser().pipe(take(1)).subscribe(user => currentUser = user)
    if(currentUser){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }
    
    return next.handle(request);
  }
}
