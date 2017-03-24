import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { AdminService } from './../../services/admin.service';

import { User, File, USER, USER_EDIT,
  USER_DATA_RESPONSE, USER_EDIT_RESPONSE
} from './../../../../angular-backend';

@Component({
  selector: 'backend-admin-user-edit',
  templateUrl: 'edit.html',
  styleUrls:['edit.scss']
})
export class BackendAdminUserEditPage {

  idx:string = null;

  user_data: USER = null;
  edit: USER_EDIT =  {};

  user_photo_idx: number = 0;
  src_photo: string = null;
  edit_src_photo: string = null;


  percentage: number = 0;

  constructor( public admin: AdminService,
               public user: User,
               private route: ActivatedRoute,
               private file: File
  ) {

    admin.onClickMenuMore();

    let id = this.route.snapshot.params['id'];
    if( id ){ //if idx exist then edit
      this.loadData( id );
    }
  }


  loadData(id?: string) {
    this.user.data(id).subscribe((res: USER_DATA_RESPONSE) => {
      this.user_data = res.data.user;
      this.edit.name = this.user_data.name;
      this.edit.email = this.user_data.email;
      this.edit.gender = this.user_data.gender;
      this.edit.id = this.user_data.id;
      this.edit_src_photo = this.file.src( { idx: this.user_data.primary_photo_idx });
      /** this.edit = res.data.user; **/
      console.log('onClickLoadData::res', res);
    }, err => this.user.alert(err));
  }

  onClickUpdateProfile() {
    //console.log('onClickUpdateProfile::this.edit', this.edit );
    this.user.edit(this.edit).subscribe((res: USER_EDIT_RESPONSE) => {
      console.log(res);
    }, err => this.user.alert(err));
  }


}

