import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';

export * from '../interface';
export * from '../define';

import {
    POST
} from '../interface';

@Injectable()
export class PostData extends Base {
    constructor( http: Http ) {
        super( http, 'post_data' );
    }
}
