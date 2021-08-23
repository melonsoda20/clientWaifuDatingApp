import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/models/user.model';
import {map} from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Login } from 'src/models/login.model';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl:string = environment.apiUrl;
  private currentUserSource = new ReplaySubject<Login>(1);
  
  constructor(private http: HttpClient, private storageService: StorageService) { }

  login(user: User){
    return this.http.post(this.baseUrl + 'account/login', user).pipe(
      map((response: Login) => {
        const loginData = response;
        if(loginData){
          this.setCurrentUser(loginData);
        }
      })
    );
  }

  register(userData: User){
    return this.http.post(this.baseUrl + 'account/register', userData).pipe(
      map((loginData: Login) => {
        if(loginData){
          this.setCurrentUser(loginData);
        }
        return loginData;
      })
    );
  }

  setCurrentUser(user: Login){
    const userStorageKey : string = this.storageService.getUserStorageKey();
    localStorage.setItem(userStorageKey, JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  getCurrentUser(){
    return this.currentUserSource.asObservable();
  }

  logout(){
    const userStorageKey = this.storageService.getUserStorageKey();
    localStorage.removeItem(userStorageKey);
    this.currentUserSource.next(null);
  }
}
