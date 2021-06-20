import { Injectable } from '@angular/core';

const userStorageKey : string = 'user';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  constructor() { }

  getUserStorageKey(){
    return userStorageKey;
  }
}
