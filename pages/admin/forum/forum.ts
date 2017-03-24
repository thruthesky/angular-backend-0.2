import { Component } from '@angular/core';
import { AdminService } from './../services/admin.service';
import { PostData, POST, POSTS,
    LIST, POST_LIST_RESPONSE
 } from './../../../angular-backend';
@Component({
  selector: 'backend-admin-forum-page',
  templateUrl: './forum.html',
  styleUrls:['./forum.scss']
})
export class BackendAdminForumPage {

    posts: POSTS = [];
    constructor( public admin: AdminService, private postData: PostData ) {

        admin.onClickMenuMore();


        let list: LIST = {
            select: 'idx, title, created',
            order: 'idx DESC'
        };
        this.postData.list( list ).subscribe( (res: POST_LIST_RESPONSE ) => {

            console.log(res);

            this.posts = res.data.posts;


            this.posts.map( (post: POST) => {
                post.created = ( new Date( parseInt(post.created) * 1000 ) ).toString();
            });


        }, err => this.postData.alert( err ));


    }
}
