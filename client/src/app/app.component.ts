import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/services/account.service';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating app';
  users: any;

  constructor(private appService: AppService,
              private accountService: AccountService){

  }
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userData = this.appService.getCurrentUser();
    this.accountService.setCurrentUser(userData);
  }
}
