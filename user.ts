import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';
import { Observable } from 'rxjs/Rx';
export * from './interface';
export * from './define';
import {
    USER_GET,
    USER_LOGIN, USER_LOGOUT,
    USER_REGISTER, USER_REGISTER_RESPONSE,
    USER_UPDATE, USER_UPDATE_RESPONSE,
    USER_GET_RESPONSE
} from './interface';
// import { KEY_SESSION_ID } from './defines';
@Injectable()
export class User extends Base {
    constructor( http: Http ) {
        super( http );
    }




    get logged() : boolean {
        if ( this.getSessionId() ) return true;
        else return false;
    }


    /**
     * 
     * Gets user data from backend.
     * 
     * @note User can only get his data. so, no need to get 'session_id' as parameter. Just get it from localStorage.
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
    data() : Observable<USER_GET_RESPONSE> {
        if ( this.logged == false ) return Observable.throw( this.errorResponse( -420, "user-not-logged-in" ));
        let req = <USER_GET> {};
        req.route = 'user.get';
        req.session_id = this.getSessionId();
        return this.post( req );
    }
    register( req: USER_REGISTER ) : Observable<USER_REGISTER_RESPONSE> {
        req.route = 'register';
        return this.post( req )
        .map( ( res: USER_REGISTER_RESPONSE ) => {
            this.setSessionId( res );
            return res;
        });
    }
    
    update( req: USER_UPDATE ) : Observable<USER_UPDATE_RESPONSE> {
        req.route = 'user.edit';
        req.session_id = this.getSessionId();
        return this.post( req )
            .map( ( res: USER_UPDATE_RESPONSE ) => {
                this.setSessionId( res );
                return res;
            });
    }

    login( req: USER_LOGIN ) {
        req.route = 'login';
        return this.post( req )
            .map( (res: any) => {
                this.setSessionId( res );
                return res;
            });
    }

    logout() {
        let req: USER_LOGOUT = {
            route: 'logout',
            session_id: this.getSessionId()
        };
        let observable = this.post( req );
        this.deleteSessionId();
        return observable;

    }

    // getUserData() {
    //     if( this.logged == false) return;
    //     let req:any = {};
    //     req.mc = 'user.get';
    //     req.session_id = this.getSessionId();
    //     console.log(req);
    //     return this.post( req )
    //         .map( (res: any) => {
    //             if ( this.isError( res ) ) return res;
    //             return res;
    //         });
    // }
    // register( req: USER_REGISTER ) {
    //     req.mc = 'user.create';
    //     return this.post( req )
    //         .map( (res: any) => {
    //             if ( this.isError( res ) ) return res;
    //             this.setSessionId( res );
    //             return res;
    //         });
    // }
    // update( req: USER_UPDATE ) {
    //     req.mc = 'user.update';
    //     req.session_id = this.getSessionId();
    //     return this.post( req )
    //         .map( (res: any) => {
    //             if ( this.isError( res ) ) return res;
    //             this.setSessionId( res );
    //             return res;
    //         });
    // }
    // login( req: USER_LOGIN ) {
    //     req.mc = 'user.login';
    //     return this.post( req )
    //         .map( (res: any) => {
    //             if ( this.isError( res ) ) return res;
    //             this.setSessionId( res );
    //             return res;
    //         });
    // }
    // logout() {
    //     this.deleteSessionId( );
    //     let req: USER_LOGOUT = {
    //         mc: 'user.logout',
    //         session_id: this.getSessionId()
    //     };
    //     this.post( req ).subscribe( res => {
    //         console.log("logout success: ", res );
    //     });
    // }
}
