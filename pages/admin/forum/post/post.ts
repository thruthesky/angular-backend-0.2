import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from './../../services/admin.service';
import {  File, PostData, PostConfig,
  POST, POSTS, POST_CREATE, POST_EDIT,
  LIST, POST_LIST_RESPONSE,
  POST_CREATE_RESPONSE, POST_EDIT_RESPONSE, POST_DELETE_RESPONSE,
  PAGINATION_OPTION,

  CONFIGS, CONFIG_RESPONSE,

  UPLOAD,
  _POST_EDIT

} from './../../../../angular-backend';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import {ActivatedRoute} from "@angular/router";

import { PostEditModalComponent } from "./../../components/modal/post/edit/edit";



@Component({
  selector: 'backend-admin-forum-post-page',
  templateUrl: './post.html',
  styleUrls:['./post.scss']
})
export class BackendAdminForumPostPage {
  post_config_id: string = '';

  postConfigs: CONFIGS = [];


  searchPostForm: POST = {};
  postCreate: POST_CREATE = {};
  posts: POSTS = [];

  pageOption: PAGINATION_OPTION = {
    limitPerPage: 5,
    currentPage: 1,
    limitPerNavigation: 4, //
    totalRecord: 0
  };
  searchQuery = <LIST>{
    limit: this.pageOption['limitPerPage'],
    extra: {file: true}
  };

  photoIdxes: Array<number> = [];

  searchPostChangeDebounce = new Subject();


  //
  showPostForm: boolean = false;
  postPostForm: _POST_EDIT = <_POST_EDIT>{};

  constructor( public admin: AdminService,
               private postData: PostData,
               private file: File,
               private postConfig: PostConfig,
               private route: ActivatedRoute,
               private modal       : NgbModal
  ) {

    admin.onClickMenuMore();

    //
    // this.searchQuery = {
    //   //select: 'idx, title, created',
    //   order: 'idx DESC',
    //   //extra: { file: false, meta: true, post_config_id: 'qna' }
    // };

    this.searchQuery['order'] = 'idx DESC';
    //
    // this.config_idx = this.route.snapshot.params['idx'];
    // if( this.config_idx ){
    //   console.log(this.config_idx);
    //   this.loadPostData( this.config_idx );
    // }

    route.params.subscribe( params => {
      if ( params['post_config_id'] !== void 0 ) {
          this.post_config_id = params['post_config_id'];
      }
    });

    this.loadPostData();


    this.searchPostChangeDebounce
      .debounceTime(500) // wait 500ms after the last event before emitting last event
      .subscribe(() => this.onChangedPostSearch());
  }

  onPostPageClick( $event ) {
    //console.log('onPageClick::$event',$event);
    this.pageOption['currentPage'] = $event;
    this.loadPostData();
  }


  onClickCreatePost() {
    this.postCreate.file_hooks = this.photoIdxes;
    this.postData.create( this.postCreate ).subscribe( ( res: POST_CREATE_RESPONSE ) =>{
      console.log( res );
    }, err => this.postData.alert( err ) );
  }

  onChangePostSearch() {
    this.searchPostChangeDebounce.next();
  }

  onChangedPostSearch() {
    //console.log('onChangeSearch', this.searchPostForm);

    if (this.searchPostForm.title) {
      if (this.searchPostForm.title.length < 2) return;
    }
    if (this.searchPostForm.content) {
      if (this.searchPostForm.content.length < 2) return;
    }

    let cond = '';
    let bind = '';

    if (this.searchPostForm.title) cond += "title LIKE ? ";
    if (this.searchPostForm.title) bind += `%${this.searchPostForm.title}%`;

    if (this.searchPostForm.content) cond += cond ? "AND content LIKE ? " : "content LIKE ?";
    if (this.searchPostForm.content) bind += bind ? `,%${this.searchPostForm.content}%` : `%${this.searchPostForm.content}%`;

    this.searchQuery.where = cond;
    this.searchQuery.bind = bind;
    this.searchQuery.order= 'idx DESC';
    this.pageOption.currentPage = 1;
    this.loadPostData();
  }

  loadPostData() {
    this.posts = [];
    this.searchQuery.page = this.pageOption.currentPage;
    this.searchQuery.extra['post_config_id'] = this.post_config_id ? this.post_config_id : null;

    this.postData.list( this.searchQuery ).subscribe( (res: POST_LIST_RESPONSE ) => {

      console.log('this.postData.list::', res);

      this.posts = res.data.posts;

      this.pageOption.totalRecord = parseInt(res.data.total);


      this.posts.map( (post: POST) => {
        post.created = ( new Date( parseInt(post.created) * 1000 ) ).toString();
      });


    }, err => this.postData.alert( err ));
  }


  reloadPosts() {
    this.searchPostForm = {};
    this.onChangedPostSearch();
    //this.loadPostData();
  }



  onClickPostEdit( _post: POST ) {

    if( _post.deleted == '1' ) return;
    console.log(_post);

    let edit: POST_EDIT = {
      idx: _post.idx,
      title: _post.title,
      content: _post.content
    };
    this.postData.edit( edit ).subscribe( (res:POST_EDIT_RESPONSE ) => {
      console.log("edit response::" ,res);
    }, err => this.postData.alert(err));
  }

  onClickPostDelete( _post ) {
    if( _post.deleted == '1' ) return;
    console.log( _post.idx );
    this.postData.delete( parseInt( _post.idx) ).subscribe( (res: POST_DELETE_RESPONSE) => {
      console.log("delete response: ", res);
      _post.deleted = '1';
      //this.posts = this.posts.filter( ( post: POST ) => post.idx != _post.idx );
    }, err => this.postData.alert( err ) );

  }


  onChangeFile( fileInput ) {
    console.log("file changed: ", fileInput);
    let file = fileInput.files[0];
    let req = <UPLOAD> {};

    this.file.upload(req, file).subscribe(res => {
      console.log("file upload", res);
      this.photoIdxes.push( res.data.idx );
    }, err => {
      console.log('error', err);
    });
  }


  onClickShowPostDetail( idx?:string ) {
    console.log('onClickShowPostDetail::idx', idx);

    let query = <LIST>{
      where: `idx = ?`,
      bind: idx,
      extra: {file: true}
    };

    this.postData.list( query ).subscribe( (res:POST_LIST_RESPONSE) => {
      console.log('onClickShowPostDetail::', res);
      this.showPostDetail( res.data.posts[0] );
    }, err => this.postData.alert( err ));

  }

  showPostDetail( post: POST) {
    let modalOption = {};
    //if ( option.class ) modalOption['windowClass'] = option.class;
    modalOption['windowClass'] = 'post-modal-view';
    let modalRef = this.modal.open ( PostEditModalComponent, modalOption );


    modalRef.componentInstance['post'] = post;

    modalRef.result.then((result) => {
      console.info( `Closed with: ${result}` );
    }, (reason) => {
      console.info( "dismissed", reason );
    });
  }



}
