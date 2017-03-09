import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';
export * from './interface';
export * from './define';
@Injectable()
export class Backend extends Base {
    constructor( http: Http ) {
        super( http );
    }
}
