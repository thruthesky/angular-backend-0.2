import { Component } from '@angular/core';
import { AdminService } from './../services/admin.service';
import {  PostConfig, PostData,
  POST, POSTS,
  LIST, POST_LIST_RESPONSE, CONFIG_DELETE_RESPONSE, CONFIG_EDIT_RESPONSE,
  CONFIG, CONFIGS, CONFIG_CREATE, CONFIG_EDIT, CONFIG_CREATE_RESPONSE,
  PAGINATION_OPTION
} from './../../../angular-backend';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'backend-admin-forum-page',
  templateUrl: './forum.html',
  styleUrls:['./forum.scss']
})
export class BackendAdminForumPage {

  config_idx: number = null;
  searchPostForm: POST = {};

  posts: POSTS = [];



  searchConfigForm: CONFIG = {};
  postConfigs: CONFIGS = [];
  configCreate: CONFIG_CREATE = {};


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
  searchPostChangeDebounce = new Subject();


  constructor( public admin: AdminService,
               private postData: PostData,
               private postConfig: PostConfig,
               private route: ActivatedRoute,
  ) {

    admin.onClickMenuMore();

    //
    // this.searchQuery = {
    //   //select: 'idx, title, created',
    //   order: 'idx DESC',
    //   //extra: { file: false, meta: true, post_config_id: 'qna' }
    // };

    this.searchQuery['order'] = 'idx DESC';

    this.config_idx = this.route.snapshot.params['idx'];
    if( this.config_idx ){
      console.log(this.config_idx);
      this.loadPostData( this.config_idx );
    }

    this.loadPostData();
    this.loadPostConfig();


    this.searchConfigChangeDebounce
      .debounceTime(300) // wait 300ms after the last event before emitting last event
      .subscribe(() => this.onChangedConfigSearch());

    this.searchPostChangeDebounce
      .debounceTime(300) // wait 300ms after the last event before emitting last event
      .subscribe(() => this.onChangedPostSearch());




  }

  onConfigPageClick( $event ) {
    //console.log('onPageClick::$event',$event);
    this.pageOption['currentPage'] = $event;
    this.loadPostConfig();
  }


  onClickCreateForum() {
    this.postConfig.create(this.configCreate).subscribe( (res:CONFIG_CREATE_RESPONSE ) => {
      console.log(res);
    }, err => this.postConfig.alert(err));
  }


  onChangeConfigSearch() {
    this.searchConfigChangeDebounce.next();
  }


  onChangedConfigSearch() {
    //console.log('onChangeSearch', this.searchConfigForm);

    if (this.searchConfigForm.id) {
      if (this.searchConfigForm.id.length < 2) return;
    }
    if (this.searchConfigForm.name) {
      if (this.searchConfigForm.name.length < 2) return;
    }
    if (this.searchConfigForm.description) {
      if (this.searchConfigForm.description.length < 2) return;
    }

    let cond = '';
    let bind = '';

    if (this.searchConfigForm.id) cond += "id LIKE ? ";
    if (this.searchConfigForm.id) bind += `%${this.searchConfigForm.id}%`;

    if (this.searchConfigForm.name) cond += cond ? "AND name LIKE ? " : "name LIKE ?";
    if (this.searchConfigForm.name) bind += bind ? `,%${this.searchConfigForm.name}%` : `%${this.searchConfigForm.name}%`;

    if (this.searchConfigForm.description) cond += cond ? "AND description LIKE ? " : "description LIKE ? ";
    if (this.searchConfigForm.description) bind += bind ? `,%${this.searchConfigForm.description}%` : `%${this.searchConfigForm.description}%`;

    this.searchQuery.where = cond;
    this.searchQuery.bind = bind;
    this.searchQuery.order= 'idx DESC';
    this.pageOption.currentPage = 1;
    this.loadPostConfig();
  }

  loadPostConfig() {


    this.postConfigs = [];

    this.searchQuery.page = this.pageOption.currentPage;

    this.postConfig.list( this.searchQuery ).subscribe( (res: POST_LIST_RESPONSE ) => {

      console.log(res);

      this.postConfigs = res.data.configs;
      this.pageOption.totalRecord = parseInt(res.data.total);


      this.postConfigs.map( (config: CONFIG) => {
        config.created = ( new Date( parseInt(config.created) * 1000 ) ).toString();
      });


    }, err => this.postData.alert( err ));
  }

  onClickConfigEdit( config: CONFIG ) {
    console.log(config);

    let edit: CONFIG_EDIT = {
      id: config.id,
      name: config.name,
      description: config.description,
      moderators: config.moderators,
      level_list: config.level_list,
      level_view: config.level_view,
      level_write: config.level_write,
      level_comment: config.level_comment
    };
    this.postConfig.edit( edit ).subscribe( (res:CONFIG_EDIT_RESPONSE ) => {
      console.log("edit response::" ,res);
    }, err => this.postConfig.alert(err));
  }

  onClickConfigDelete( id ) {
    console.log( id );
    this.postConfig.delete( id ).subscribe( (res: CONFIG_DELETE_RESPONSE) => {
      console.log("delete response: ", res);
      this.postConfigs = this.postConfigs.filter( ( config: CONFIG ) => config.id != id );
    }, err => this.postConfig.alert( err ) );

  }




  /********** POST DATA ************/


  onPostPageClick( $event ) {}

  onClickCreatePostData() {
  }

  onChangePostSearch() {
    this.searchPostChangeDebounce.next();
  }

  onChangedPostSearch() {}

  loadPostData( idx? ) {
    console.log('loadPostData::idx', idx);
  }

  onClickPostEdit( post ) {}

  onClickPostDelete( id ) {}

}
