import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userData: User = {
    username: '',
    password: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.userData);
  }

  cancel(){
    console.log('cancelled');
  }

}
