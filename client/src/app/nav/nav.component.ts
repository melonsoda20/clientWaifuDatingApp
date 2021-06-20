import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.user);
  }

}
