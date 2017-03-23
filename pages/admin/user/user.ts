import { Component } from '@angular/core';
import { AdminService } from './../services/admin.service';
@Component({
  selector: 'backend-admin-user-page',
  templateUrl: './user.html',
  styleUrls:['./user.scss']
})
export class BackendAdminUserPage {
  constructor( public admin: AdminService ) {

    admin.onClickMenuMore();
    
  }
}

