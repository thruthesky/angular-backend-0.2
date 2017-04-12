import { Component } from '@angular/core';
import { AdminService } from './../../services/admin.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

import { User, USER, LIST,
  USER_LIST_RESPONSE, USER_LOGOUT_RESPONSE, USER_LOGIN, USER_LOGIN_RESPONSE,
  USER_EDIT, USER_EDIT_RESPONSE,
  USER_DELETE, USER_DELETE_RESPONSE
} from './../../../../angular-backend';
@Component({
  selector: 'backend-admin-user-list',
  templateUrl: 'list.html',
  styleUrls:['list.scss']
})
export class BackendAdminUserListPage {

  _id: string = null;
  _password: string = null;

  paginationUsers = <Array<USER>> [];
  searchForm = <USER>{};
  searchQuery = <LIST>{};

///search options /////
  limitPerPage: number = 5;
  currentPage: number = 1;
  numberPerNav: number = 4;
  totalRecord: number = 0;

  searchChangeDebounce = new Subject();
  constructor(
      public admin: AdminService,
      public user: User
  ) {

    admin.onClickMenuMore();
    //this.loadNewlyRegisteredUsers();
    this.onChangedSearch();

    this.searchChangeDebounce
        .debounceTime(300) // wait 300ms after the last event before emitting last event
        .subscribe(() => this.onChangedSearch());


  }

  onPageClick($event) {
    //console.log('onPageClick::$event',$event);
    this.currentPage = $event;
    this.loadSearchedData();
  }


  onChangeSearch() {
    this.searchChangeDebounce.next();
  }

  onChangedSearch() {
    //console.log('onChangeSearch', this.searchForm);

    if (this.searchForm.id) {
      if (this.searchForm.id.length < 2) return;
    }
    if (this.searchForm.name) {
      if (this.searchForm.name.length < 2) return;
    }
    if (this.searchForm.email) {
      if (this.searchForm.email.length < 2) return;
    }

    let cond = '';
    let bind = '';

    if (this.searchForm.id) cond += "id LIKE ? ";
    if (this.searchForm.id) bind += `%${this.searchForm.id}%`;

    if (this.searchForm.name) cond += cond ? "AND ( name LIKE ? OR middle_name LIKE ? OR last_name LIKE ? ) " : "( name LIKE ? OR middle_name LIKE ? OR last_name LIKE ? )";
    if (this.searchForm.name) bind += bind ? `,%${this.searchForm.name}%,%${this.searchForm.name}%,%${this.searchForm.name}%` : `%${this.searchForm.name}%,%${this.searchForm.name}%,%${this.searchForm.name}%`;

    if (this.searchForm.email) cond += cond ? "AND email LIKE ? " : "email LIKE ? ";
    if (this.searchForm.email) bind += bind ? `,%${this.searchForm.email}%` : `%${this.searchForm.email}%`;

    this.searchQuery.where = cond;
    this.searchQuery.bind = bind;
    this.searchQuery.order= 'idx DESC';
    this.currentPage = 1;
    this.loadSearchedData();
  }


  loadSearchedData() {

    this.paginationUsers = [];
    this.searchQuery.from = this.limitPerPage * this.currentPage - this.limitPerPage;
    this.searchQuery.limit = this.limitPerPage;
    this.user.list(this.searchQuery).subscribe((res: USER_LIST_RESPONSE) => {
      //console.info( 'loadSearchedData', res );
      this.paginationUsers = res.data.users;
      this.totalRecord = parseInt(res.data.total);

    }, err => this.user.alert(err));
  }



  onClickEdit( user: USER ) {
    console.log(user);
    let edit: USER_EDIT = {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender
    };
    this.user.edit( edit ).subscribe( (res: USER_EDIT_RESPONSE) => {
      console.log("edit response: ", res);
    }, err => this.user.alert( err ) );
  }

  onClickDelete( id: string ) {

    console.log( id );

    this.user.delete( id ).subscribe( (res: USER_DELETE_RESPONSE) => {
      console.log("delete response: ", res);
      this.paginationUsers = this.paginationUsers.filter( ( user: USER ) => user.id != id );
    }, err => this.user.alert( err ) );
  }


}

