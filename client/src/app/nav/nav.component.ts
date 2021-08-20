import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private accountService: AccountService,
              private router: Router,
              private toastr: ToastrService) { 
    
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.getCurrentUser();
  }

  login(){
    this.accountService.login(this.user).subscribe(response => {
      this.router.navigateByUrl('/members');
    });
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
