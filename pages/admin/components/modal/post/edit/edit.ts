import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {  PostData,
    POST, POSTS, POST_LIST_RESPONSE

} from './../../../../../../angular-backend';

@Component({
    selector:'post-edit-modal',
    templateUrl: 'edit.html',
    styleUrls: ['edit.scss']
})

export class PostEditModalComponent{
    post: POST = [];

    posts: POSTS = [];

    constructor(
        private postData: PostData,
        public activeModal: NgbActiveModal
    ) {

        //
        // if (  ! this.idx ) activeModal.close('idx is empty');
        // else {
        //     this.loadPostData();
        // }


    }
    //
    // loadPostData() {
    //     this.postData.data( this.idx ).subscribe( (res: POST_LIST_RESPONSE ) => {
    //
    //         console.log('loadPostData.postData.data::', res);
    //
    //         this.posts = res.data.posts;
    //
    //         this.posts.map( (post: POST) => {
    //             post.created = ( new Date( parseInt(post.created) * 1000 ) ).toString();
    //         });
    //
    //
    //     }, err => this.postData.alert( err ));
    // }



}
