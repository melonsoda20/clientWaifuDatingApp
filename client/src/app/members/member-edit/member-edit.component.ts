import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Login } from 'src/models/login.model';
import { Member } from 'src/models/member.model';
import { AccountService } from 'src/services/account.service';
import { MembersService } from 'src/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member: Member;
  user: Login;

  constructor(private accountService: AccountService, private memberService: MembersService) { 
    this.accountService.getCurrentUser().pipe(take(1)).subscribe(user => this.user = user)
  }

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }

}
