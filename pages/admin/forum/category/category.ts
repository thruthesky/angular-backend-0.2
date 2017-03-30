import { Component } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { Category, LIST,
  CATEGORY, CATEGORIES,
  CATEGORY_CREATE, CATEGORY_CREATE_RESPONSE, CATEGORY_EDIT, POST_LIST_RESPONSE,
  PAGINATION_OPTION
} from './../../../../angular-backend';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import {ActivatedRoute} from "@angular/router";




@Component({
  selector: 'backend-admin-forum-category-page',
  templateUrl: './category.html',
  styleUrls:['./category.scss']
})
export class BackendAdminForumCategoryPage {

  searchCategoryForm: CATEGORY = {};

  categories: CATEGORIES = [];
  categoryCreate: CATEGORY_CREATE = {};


  pageOption: PAGINATION_OPTION = {
    limitPerPage: 5,
    currentPage:3,
    numberPerNav: 4, //
    totalRecord: 0
  };

  searchQuery = <LIST>{
    limit: this.pageOption['limitPerPage']
  };

  searchConfigChangeDebounce = new Subject();


  constructor( public admin: AdminService,
               private route: ActivatedRoute,
               private _category: Category
  ) {
console.log('category::');

     admin.onClickMenuMore();

    //
    // this.searchQuery = {
    //   //select: 'idx, title, created',
    //   order: 'idx DESC',
    //   //extra: { file: false, meta: true, post_config_id: 'qna' }
    // };
    //
    // this.searchQuery['order'] = 'idx DESC';
    //
    this.loadCategory();


    this.searchConfigChangeDebounce
      .debounceTime(300) // wait 300ms after the last event before emitting last event
      .subscribe(() => this.onChangedCategorySearch());




  }

  onConfigPageClick( $event ) {
    console.log('onPageClick::$event',$event);
    this.pageOption['currentPage'] = $event;
    this.loadCategory();
  }

  onClickCreateCategory() {
    this._category.create(this.categoryCreate).subscribe( (res:CATEGORY_CREATE_RESPONSE ) => {
      console.log(res);
    }, err => this._category.alert(err));
  }


  onChangeConfigSearch() {
    this.searchConfigChangeDebounce.next();
  }


  onChangedCategorySearch() {
    //console.log('onChangeSearch', this.searchCategoryForm);

    if (this.searchCategoryForm.id) {
      if (this.searchCategoryForm.id.length < 2) return;
    }
    if (this.searchCategoryForm.name) {
      if (this.searchCategoryForm.name.length < 2) return;
    }
    if (this.searchCategoryForm.description) {
      if (this.searchCategoryForm.description.length < 2) return;
    }

    let cond = '';
    let bind = '';

    if (this.searchCategoryForm.id) cond += "id LIKE ? ";
    if (this.searchCategoryForm.id) bind += `%${this.searchCategoryForm.id}%`;

    if (this.searchCategoryForm.name) cond += cond ? "AND name LIKE ? " : "name LIKE ?";
    if (this.searchCategoryForm.name) bind += bind ? `,%${this.searchCategoryForm.name}%` : `%${this.searchCategoryForm.name}%`;

    if (this.searchCategoryForm.description) cond += cond ? "AND description LIKE ? " : "description LIKE ? ";
    if (this.searchCategoryForm.description) bind += bind ? `,%${this.searchCategoryForm.description}%` : `%${this.searchCategoryForm.description}%`;

    this.searchQuery.where = cond;
    this.searchQuery.bind = bind;
    this.searchQuery.order= 'idx DESC';
    this.pageOption.currentPage = 1;
    this.loadCategory();
  }

  loadCategory() {
    console.log('loadCategory::');

    this.categories = [];

    this.searchQuery.page = this.pageOption.currentPage;

    this._category.list().subscribe( (res: any ) => {

      console.log('_category::list',res);

      this.categories = res.data.configs;
      this.pageOption.totalRecord = parseInt(res.data.total);


      this.categories.map( (category: CATEGORY) => {
        category.created = ( new Date( parseInt(category.created) * 1000 ) ).toString();
      });


    }, err => this._category.alert( err ));
  }

  onClickConfigEdit( category: CATEGORY ) {
    console.log( category );

    let edit: CATEGORY_EDIT = {
      id: category.id,
      model: category.model,
      model_idx: category.model_idx,
      name: category.name,
      description: category.description,
      parent_idx: category.parent_idx
    };
    this._category.edit( edit ).subscribe( (res:any ) => {
      console.log("edit response::" ,res);
    }, err => this._category.alert(err));
  }

  onClickConfigDelete( id ) {
    console.log( id );
    this._category.delete( id ).subscribe( (res: any) => {
      console.log("delete response: ", res);
      this.categories = this.categories.filter( ( category: CATEGORY ) => category.id != id );
    }, err => this._category.alert( err ) );

  }




}
