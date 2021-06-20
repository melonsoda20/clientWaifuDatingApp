import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  userData: User = {
    username: '',
    password: ''
  };

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.userData).subscribe(response => {
      console.log(response);
      this.cancel();
    }, error => {
      console.log(error);
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
