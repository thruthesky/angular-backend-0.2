import { Component } from '@angular/core';
import { AdminService } from './../services/admin.service';
@Component({
  selector: 'backend-admin-page',
  templateUrl: './index.html',
  styleUrls:['./index.scss']
})
export class BackendAdminPage {
  constructor( public admin: AdminService ) {

    admin.onClickMenuMore();
    
  }
}
