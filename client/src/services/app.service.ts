import { Injectable } from '@angular/core';
import { Login } from 'src/models/login.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private storageService: StorageService) { }

  getCurrentUser(){
    const userStorageKey = this.storageService.getUserStorageKey();
    const currentUser: Login = JSON.parse(localStorage.getItem(userStorageKey));
    return currentUser;
  }
}
