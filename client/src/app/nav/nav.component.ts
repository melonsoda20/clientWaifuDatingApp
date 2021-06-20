import { Component, OnInit } from '@angular/core';
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

  isLoggedIn: boolean;

  constructor(private accountService: AccountService) { 
    
  }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.user).subscribe(response => {
      console.log(response);
      this.isLoggedIn = true;
    }, error =>{
      console.log(error);
    });
  }

}
