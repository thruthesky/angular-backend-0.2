import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';

import { Observable } from 'rxjs/Rx';
import {
    REQUEST, RESPONSE, POST_RESPONSE, POST_CREATE
} from './interface';
export * from './define';

@Injectable()
export class Post extends Base {
    constructor( http: Http ) {
        super( http );
    }


    //Get List of Post Data
    list( req:any = {} )  {
        req.route = 'post.list';
        req.limit = '100'; // Test just to get all the data
        return this.post( req )
        .map( ( res:POST_RESPONSE  ) => {
            return res['data']['posts'];
        });
    }
    create( req: POST_CREATE)  {
        req.route= 'post.create';
        return this.post( req );
    }


}
