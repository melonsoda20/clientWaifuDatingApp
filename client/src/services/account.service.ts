import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl:string = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  login(user: User){
    return this.http.post(this.baseUrl + 'account/login', user);
  }
}
