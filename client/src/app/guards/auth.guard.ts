import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private accountService: AccountService, 
              private toastrService: ToastrService){

  }
  
  canActivate(): Observable<boolean>{
    const currentUserObservable = this.accountService.getCurrentUser().pipe(
      map(user => {
        if(user){
          return true;
        }
        else{
          this.toastrService.error('Access is unauthorized');
        }
      })
    );

    return currentUserObservable;
  }
  
}
