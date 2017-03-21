import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';

export * from './interface';
export * from './define';

import { Observable } from 'rxjs/Observable';

import {
    CONFIG_CREATE, CONFIG_CREATE_RESPONSE
} from './interface';

@Injectable()
export class PostConfig extends Base {
    constructor( http: Http ) {
        super( http, 'post_config' );
    }


    create( req: CONFIG_CREATE ) : Observable<CONFIG_CREATE_RESPONSE> {
        req.route = 'post_config.create';
        return this.post( req );
    }
}


