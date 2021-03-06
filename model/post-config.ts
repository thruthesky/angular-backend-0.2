import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';

export * from '../interface';
export * from '../define';

import { Observable } from 'rxjs/Observable';

import {
    PostData,
    CONFIG_CREATE, CONFIG_CREATE_RESPONSE
} from './post-data';

@Injectable()
export class PostConfig extends Base {
    constructor( http: Http ) {
        super( http, 'post_config' );
    }



}


