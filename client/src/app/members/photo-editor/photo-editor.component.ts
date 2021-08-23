import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login } from 'src/models/login.model';
import { Member } from 'src/models/member.model';
import { Photo } from 'src/models/photo.model';
import { AccountService } from 'src/services/account.service';
import { MembersService } from 'src/services/members.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member; 
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: Login

  constructor(private accountService: AccountService, private membersService: MembersService) {
    this.accountService.getCurrentUser().pipe(take(1)).subscribe(user => this.user = user)
   }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any){
    this.hasBaseDropzoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.membersService.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.accountService.setCurrentUser(this.user);
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(p => {
        if(p.isMain)
        {
          p.isMain = false;
        }
        if(p.id === photo.id)
        {
          p.isMain = true;
        }
      })
    });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      const photo = JSON.parse(response);
      this.member.photos.push(photo);
    }
  } 

}
