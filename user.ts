import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';

import { Observable } from 'rxjs/Rx';
export * from './interface';
export * from './define';
import {
    USER_DATA, USER_DATA_RESPONSE,
    USER_LOGIN, USER_LOGIN_RESPONSE, USER_LOGOUT, USER_LOGOUT_RESPONSE,
    USER_REGISTER, USER_REGISTER_RESPONSE,
    USER_UPDATE, USER_UPDATE_RESPONSE,
    USER_LIST, USER_LIST_RESPONSE

} from './interface';
// import { KEY_SESSION_ID } from './defines';
@Injectable()
export class User extends Base {
    constructor( http: Http ) {
        super( http );
    }




    /**
     * 
     * 
     * Gets user data from backend.
     * 
     * @note User can only get his data. so, no need to get 'session_id' as parameter. Just get it from localStorage.
     * 
     * 
     * @code

        let req : USER_REGISTER_REQUEST_DATA = {
            id:         this.id,
            password:   this.password,
            name:       this.name,
            nickname:   this.nickname,
            email:      this.email,
            mobile:     this.mobile,
            landline:   this.landline,
            gender:     this.gender,
            birthday:   this.birthday,
            meta:       {
                type: this.type,
                classid: 'my-skype-id'
            }
        }
        console.log(req);
        this.user.register( req, ( res: USER_REGISTER_RESPONSE_DATA ) => {
            console.info('register success: ', res);
        },
        error => alert(error),
        () => console.log('user registration complete') );

     * @endcode
     */
    
    data() : Observable<USER_DATA_RESPONSE> {
        if ( this.logged == false ) return this.error( -420, 'login-first-before-get-user-info');
        let req = <USER_DATA> {};
        req.route = 'user.data';
        req.session_id = this.getSessionId();
        return this.post( req );
    }
    register( req: USER_REGISTER ) : Observable<USER_REGISTER_RESPONSE> {
        req.route = 'register';
        return this.post( req )
        .map( ( res: USER_REGISTER_RESPONSE ) => {
            this.setSessionInfo( res );
            return res;
        });
    }
    
    update( req: USER_UPDATE ) : Observable<USER_UPDATE_RESPONSE> {
        if ( this.logged == false ) return this.error( -421, 'login-first-before-update');
        req.route = 'user.edit';
        req.session_id = this.getSessionId();
        return this.post( req )
            .map( ( res: USER_UPDATE_RESPONSE ) => {
                this.setSessionInfo( res );
                return res;
            });
    }

    login( req: USER_LOGIN ) : Observable<USER_LOGIN_RESPONSE> {
        req.route = 'login';
        return this.post( req )
            .map( (res: any) => {
                this.setSessionInfo( res );
                return res;
            });
    }

    logout() : Observable<USER_LOGOUT_RESPONSE>  {
        let req: USER_LOGOUT = {
            route: 'logout',
            session_id: this.getSessionId()
        };
        let observable = this.post( req );
        this.deleteSessionInfo();
        return observable;
    }


    list( req: USER_LIST ) : Observable<USER_LIST_RESPONSE> {
        req.route = 'user.list';
        req.session_id = this.getSessionId();
        return this.post( req );
    }
    
    
}
