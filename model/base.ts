// import { Optional } from '@angular/core';
import { Api } from '../api';
import { URL_BACKEND_API, NO_OF_ITEMS_PER_PAGE } from '../config';
import {
    LIST,
    DATA_REQUEST,
    DELETE_REQUEST, DELETE_RESPONSE,
    _VOTE_RESPONSE,
    _REPORT_RESPONSE
} from '../angular-backend';
import { Observable } from 'rxjs/Observable';
export class Base extends Api {
  constructor (
    public http,
    public taxonomy ) {
    super(http);


  }


    /**
     *
     *
     *
     * @param req
     *
     * @code example code.
        this.config.list( {} ).subscribe( res => {
          
            console.log(res);
        }, err => {
            console.log(err);
        });
        
     *
     * @endcode
     *
     * @code
        this.config.list( {page: 2} ).subscribe( res => { } ); // get items of page no 2 of post_config
        this.user.list( { page: 2, limit: 3 } ).subscribe( res => { }); // get 2nd page of users. A pages has 3 users.
        this.config.list( { page: 1, limit: 3, where: 'id LIKE ?', bind: 'my%' } ).subscribe( res => { } ); // get upto 3 post_configs whose id begins with 'my'
        this.config.list( { limit: 1, where: 'id LIKE ?', bind: 'my%', order: 'idx DESC' } ).subscribe( res => {} ); // get the newly created post_config whose id begins with 'my'. only one data will be returned.
     * @endcode
     *
     */
    list( req: LIST = <LIST> {} ) : Observable< any > {
        req['route'] = this.taxonomy + '.list';


        /**
         * @deprecated code. // Pagination helper.
         * 
         * To make it clear and easy understanding,
         * 
         */
        // if ( ! req['limit'] ) req.limit = NO_OF_ITEMS_PER_PAGE;
        // if ( req['page'] ) {
        //     let page = req['page'] > 0 ? req['page'] : 1;
        //     let limit = req.limit;
        //     req.from =  ( page - 1 ) * limit;
        //     delete( req.page );
        // }
        //

        // req.session_id = this.getSessionId();
        return this.post( req );
  }

  create(req = {}): Observable<any> {
    req['route'] = this.taxonomy + '.create';
    return this.post(req);
  }

  delete( idx: any ): Observable<DELETE_RESPONSE> {
    let req: DELETE_REQUEST = {
      route: this.taxonomy + '.delete'
    }
    
    /// bug fix: if idx is numeric, then it is a number.
    let no = parseInt( idx );
    if ( Number.isInteger( no ) ) req.idx = idx;
    else req.id = idx;

    return this.post(req);
  }

  edit( req = {} ): Observable<any> {
    req['route'] = this.taxonomy + '.edit';
    return this.post(req);
  }

  data( idx: any ) : Observable<any> {
    let req: DATA_REQUEST = {
      route: this.taxonomy + '.data'
    };
    if ( idx ) {
      if ( ! isNaN( idx ) ) req.idx = idx;
      else req.id = idx;
    }
    return this.post( req );
  }


  vote( idx: number, choice: string = 'G' ) : Observable<_VOTE_RESPONSE> {
    let req = {
      route: this.taxonomy + '.vote',
      idx: idx,
      choice: choice
    };
    return this.post( req );
  }


  report( idx: number ) : Observable<_REPORT_RESPONSE> {
    let req = {
      route: this.taxonomy + '.report',
      idx: idx
    };
    return this.post( req );
  }




  /**
   * 
   * Common api.
   * 
   * @param idx 
   */  
  fileUrl( idx: number ) : string {
    return URL_BACKEND_API + '?route=download&idx='+idx;
  }

}
