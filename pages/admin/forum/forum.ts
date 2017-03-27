import { Component } from '@angular/core';
import { AdminService } from './../services/admin.service';
import {  PostConfig,PostData,
  POST, POSTS,
  LIST, POST_LIST_RESPONSE,
  CONFIG, CONFIGS, CONFIG_CREATE, CONFIG_CREATE_RESPONSE
} from './../../../angular-backend';
@Component({
  selector: 'backend-admin-forum-page',
  templateUrl: './forum.html',
  styleUrls:['./forum.scss']
})
export class BackendAdminForumPage {

  posts: POSTS = [];
  postConfigs: CONFIGS = [];
  configCreate: CONFIG_CREATE = {};

  constructor( public admin: AdminService,
               private postData: PostData,
               private postConfig: PostConfig
  ) {

    admin.onClickMenuMore();


    let list: LIST = {
      //select: 'idx, title, created',
      order: 'idx DESC',
      //extra: { file: false, meta: true, post_config_id: 'qna' }
    };
    this.loadPostData(list);
    this.loadPostConfig(list);
  }


  loadPostData( list?:LIST) {

    this.postData.list( list ).subscribe( (res: POST_LIST_RESPONSE ) => {

      console.log(res);

      this.posts = res.data.posts;


      this.posts.map( (post: POST) => {
        post.created = ( new Date( parseInt(post.created) * 1000 ) ).toString();
      });


    }, err => this.postData.alert( err ));

  }



  onClickCreateForum() {
    this.postConfig.create(this.configCreate).subscribe( (res:CONFIG_CREATE_RESPONSE ) => {
      console.log(res);
    }, err => this.postConfig.alert(err));
  }

  loadPostConfig( list?:LIST ) {

    this.postConfig.list( list ).subscribe( (res: POST_LIST_RESPONSE ) => {

      console.log(res);

      this.postConfigs = res.data.configs;


      this.postConfigs.map( (config: CONFIG) => {
        config.created = ( new Date( parseInt(config.created) * 1000 ) ).toString();
      });


    }, err => this.postData.alert( err ));
  }

  onClickEdit() {


  }


}
