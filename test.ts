import { Injectable } from '@angular/core';
import { Backend } from './backend';
import {
    User,
    RESPONSE,
    USER_REGISTER, USER_REGISTER_RESPONSE, USER_LOGIN_RESPONSE,
    USER_EDIT, USER_EDIT_RESPONSE
} from './user';
import { Post } from './post';
// import { Forum, CONFIG_CREATE, CONFIG_CREATE_RESPONSE } from './forum';

//import { URL_BACKEND_API } from './config';



import { Subject } from 'rxjs/Subject';




@Injectable()
export class Test {

    private count: number = 0;

    form = <USER_REGISTER> {};

    session_id = new Subject<string>();
    login_session_id = new Subject<string>();
    update_session_id = new Subject<string>();

    my_session_id: string = null;
    
    constructor(
        // private forum: Forum,
        private backend: Backend,
        private user: User
    ) {
        //console.info('Test::constructor()');
        setTimeout( () => this.run(), 100 );
    }


    private run() {

        // this.api();
        // this.register();
        // this.session_id.subscribe( id => this.login() );
        // this.login_session_id.subscribe( session_id => this.getUserData( () => this.userUpdate() ) );
        // this.update_session_id.subscribe( x => this.logout() );
        this.getPostList();
        
        // this.forumCreate( () => this.postCreate() );


    }

    success( str, ...vars ) {
        this.count ++;
        console.info(`[${this.count}] SUCCESS: ${str}`, vars);
    }
    getPostList() {
        // this.post.list().subscribe( re => {
        //     this.success("getPostList: " , re);
        // }, err => {
        //     this.error( err, "success getPostList: " );
        // } );
    }
    api() {

        this.backend.successCall().subscribe( re => {
            this.success("Version: " + re['data']['version']);
        }, err => {
            this.error( err, "successCall Test: " );
        } );
        

        this.backend.errorCall().subscribe( re => {
            this.error(re, 'This should be an error. But success ' + this.backend.getErrorString( re ));
        }, ( error ) => {
            this.success("errorCall() : This is fake error. " + this.backend.getErrorString(error) );
        } );


        this.backend.internalServerError().subscribe( re => {
            this.error("This must be 500 internal server error. but success");
        }, error => {
            console.log(error);
            if ( this.backend.isInternalServerError( error ) ) this.success("Internal Server Error: " + this.backend.getErrorString(error) );
            else this.error(error, "This must be 500 - internal server error. but it is another error.");
        });

        setTimeout( () => {
            this.backend.scriptError().subscribe( re => {
                console.log(re);
                this.error( re, "scriptError() - This should be script error. But success." );
            }, error => {
                console.log( error );
                this.success( 'This should be script error. This is PHP script error.' );
            });
        }, 100 );


        // this.backend.timeoutError().subscribe( re => {
        //     this.error( re, "This should be timeout error. But success." );
        // }, error => {
        //     if ( error.message == ERROR_TIMEOUT ) {
        //         this.success('This should be timeout error. ' + this.backend.getErrorString( error ));
        //     }
        //     else this.error( error, "This is not timeout error. But another error");
        // });



        // route error
        this.backend.routeMethodError().subscribe( re => {
            this.error( re, "Must be error");
        }, error => {
            this.success("Route Error");
            console.log( error );
        });

        this.backend.routeRequiredError().subscribe( re => {
            this.error( re, "Must be error");
        }, error => {
            this.success("Route required variable error: name is missing.");
            console.log( error );
            
        });

    }
    

    error( error, message = '' ) {
        this.count ++;
        console.error( `[${this.count}] ERROR: ${message} - ${this.backend.getErrorString( error )}` );
    }


    register() {
        let id = 'user' + (new Date).getHours() + (new Date).getMinutes() + (new Date).getSeconds();
        this.form.id = id;
        this.form.email = id + '@gmail.com';
        this.form.name = id;
        this.form.password = id;
        this.form.mobile = '09174678000';
        this.form.gender = 'M';


        this.user.register( this.form ).subscribe( (res: USER_REGISTER_RESPONSE ) => {
            this.success("User registration:\n " + res.data.session_id );
            this.session_id.next( res.data.session_id );
            
        }, error => {
            this.error( error );
        } );
    }




    login() {
        let sampleLoginData = {
            id: this.form.id,
            password: this.form.password
        };
        this.user.login( sampleLoginData ).subscribe( ( res: USER_LOGIN_RESPONSE ) => {
            this.success( "User Login:\n " + res.data.session_id );
            this.login_session_id.next(res.data.session_id);


        }, error => {
            this.error( error );
        });
    }



    getUserData( callback ) {
        this.user.data().subscribe( ( res: any ) => {
            this.success( "User Get Data: ");
            console.log(res['data']['user']);
            callback();
        }, error => {
            this.error( error, "getUserData() : error : " );
        });
    }

    userUpdate() {
        let record: USER_EDIT = {};
        this.user.edit( record ).subscribe( (res: USER_EDIT_RESPONSE ) => {
            this.success("userUpdate() : ", res);
            this.update_session_id.next( res.data.session_id );
        }, err => {
            this.error( err, "userUpdate(): ");
        });
    }

    logout() {
        this.user.logout().subscribe( (res: RESPONSE ) => {
            this.success("logout() : ", res);
        }, err => {
            this.error( err, "logout(): ");
        });
    }




    // forumCreate( callback ) {
    //     //console.log('forumCreate');
    //     let id = 'forum' + (new Date).getHours() + (new Date).getMinutes() + (new Date).getSeconds();
    //     let req: CONFIG_CREATE = {
    //         id: id
    //     };
    //     this.forum.create( req ).subscribe( (res: CONFIG_CREATE_RESPONSE) => {
    //         this.success("Forum create: " + res.data.idx );
    //         callback();
    //     }, error => {
    //         console.error( error );
    //     });
    // }

    postCreate() {
        console.log('postCreate');

    }
}