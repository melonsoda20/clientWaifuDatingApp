import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: Login;

  constructor(
    private accountService: AccountService, 
    private memberService: MembersService,
    private toastr: ToastrService) { 
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

  updateMember(){
    console.log(this.member);
    this.toastr.success('Profile updated successfully');
    this.editForm.reset(this.member);
  }
}
