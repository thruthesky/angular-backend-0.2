import { Component } from '@angular/core';
import { AdminService } from './../services/admin.service';
import { 
  User,
  ERROR_WRONG_SESSION_ID,
} from './../../../angular-backend';
import { Router } from '@angular/router';
@Component({
  selector: 'backend-admin-page',
  templateUrl: './index.html',
  styleUrls:['./index.scss']
})
export class BackendAdminPage {
  constructor( public admin: AdminService, private user: User, private router: Router ) {

    if ( user.logged && user.info.id == 'admin' ) {
      console.log(user.info);

      this.user.data().subscribe( res => {
        console.log(res);
      }, err => {
        if ( err['code'] == ERROR_WRONG_SESSION_ID ) {
          this.user.logout();
          this.router.navigateByUrl('/');
        }
        this.user.alert( err );
      } );
      
    }
    else {
      alert("Please login as admin");
      this.router.navigateByUrl('/');
    }


    admin.onClickMenuMore();
    
  }
}
