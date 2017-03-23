import { Component, OnInit } from '@angular/core';
import { User, USER_LOGOUT_RESPONSE } from './../../../angular-backend';
@Component({
  selector: 'admin-header',
  templateUrl: './header.html',
  styleUrls:['header.scss']
})
export class AdminHeaderComponent implements OnInit{
  isLogged = null;
  usertype;
  constructor( private user: User ){

  }
  ngOnInit(){
      if( ! this.user.logged ) return;
      this.user.data().subscribe( res =>{
        this.usertype = res.data.user.id;
      });
  }
  onClickLogout(){
    this.user.logout().subscribe((res: USER_LOGOUT_RESPONSE) => {
      console.log(res);
    }, err => {
      this.user.alert(err);
    });
  }
}
