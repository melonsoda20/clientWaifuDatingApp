import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/models/user.model';
import {map} from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Login } from 'src/models/login.model';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl:string = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<Login>(1);
  
  constructor(private http: HttpClient, private storageService: StorageService) { }

  login(user: User){
    return this.http.post(this.baseUrl + 'account/login', user).pipe(
      map((response: Login) => {
        const user = response;
        if(user){
          const userStorageKey = this.storageService.getUserStorageKey();
          localStorage.setItem(userStorageKey, JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: Login){
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
