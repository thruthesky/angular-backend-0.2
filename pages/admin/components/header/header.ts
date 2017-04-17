import { Component, OnInit } from '@angular/core';
import { User, USER_LOGOUT_RESPONSE } from './../../../../angular-backend';

import { AdminService } from './../../services/admin.service';
@Component({
  selector: 'admin-header',
  templateUrl: './header.html',
  styleUrls:['header.scss']
})
export class AdminHeaderComponent implements OnInit{
  isLogged = null;
  usertype;
  navclass = "collapse navbar-collapse";
  constructor( private user: User,
     public admin: AdminService  )
  {

  }
  ngOnInit(){
      if( ! this.user.logged ) return;




      // This needs internet connection every load.
      // We must limit internet connection as much as possible.
      // this.user.data().subscribe( res =>{
      //   this.usertype = res.data.user.id;
      // });
  }
  onClickLogout(){
    this.user.logout().subscribe((res: USER_LOGOUT_RESPONSE) => {
      console.log(res);
    }, err => {
      this.user.alert(err);
    });
  }
  onClickMore() {
    this.navclass = this.navclass ? null : "collapse navbar-collapse";
  }
}
