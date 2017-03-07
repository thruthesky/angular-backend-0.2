import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';
export * from './interface';
export * from './define';
import {
    USER_LOGIN,
    // USER_LOGIN_REPONSE_DATA,
     USER_LOGOUT,
     USER_REGISTER,
    // USER_REGISTER_RESPONSE_DATA,
     USER_UPDATE,
    // USER_UPDATE_RESPONSE_DATA,
    // USER_DATA_RESPONSE_DATA,
    // USER_META_RESPONSE_DATA,
    // USER_META_REQUEST_DATA,
    // USER_DATA_REQUEST_DATA
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
    getUserData() {
        if( this.logged == false) return;
        let req:any = {};
        req.mc = 'user.data';
        req.session_id = this.getSessionId();
        console.log(req);
        return this.post( req )
            .map( (res: any) => {
                if ( this.isError( res ) ) return res;
                return res;
            });

        // this.base.post( req,
        //     (res) => {
        //         success( res );
        //     },
        //     failure,
        //     complete );
    }
    register( req: USER_REGISTER ) {
        req.mc = 'user.create';
        return this.post( req )
            .map( (res: any) => {
                if ( this.isError( res ) ) return res;
                this.setSessionId( res );
                return res;
            });
    }
    update( req: USER_UPDATE ) {
        req.mc = 'user.update';
        req.session_id = this.getSessionId();
        return this.post( req )
            .map( (res: any) => {
                if ( this.isError( res ) ) return res;
                this.setSessionId( res );
                return res;
            });
    }
    login( req: USER_LOGIN ) {
        req.mc = 'user.login';
        return this.post( req )
            .map( (res: any) => {
                if ( this.isError( res ) ) return res;
                this.setSessionId( res );
                return res;
            });
    }
    logout() {
        this.deleteSessionId( );
        let req: USER_LOGOUT = {
            mc: 'user.logout',
            session_id: this.getSessionId()
        };
        this.post( req ).subscribe( res => {
            console.log("logout success: ", res );
        });
    }
}
