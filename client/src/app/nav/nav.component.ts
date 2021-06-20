import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/models/login.model';
import { AccountService } from 'src/services/account.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: User = {
    username: '',
    password: ''
  };
  currentUser$: Observable<Login>;

  constructor(private accountService: AccountService) { 
    
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.getCurrentUser();
  }

  login(){
    this.accountService.login(this.user).subscribe(response => {
      console.log(response);
    }, error =>{
      console.log(error);
    });
  }

  logout(){
    this.accountService.logout();
  }
}
