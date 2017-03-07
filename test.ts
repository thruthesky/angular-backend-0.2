import { Injectable } from '@angular/core';
import { Backend } from './backend';
import {
    User, USER_REGISTER, USER_REGISTER_RESPONSE, USER_LOGIN,
    ERROR_TIMEOUT
} from './user';
// import { Forum, CONFIG_CREATE, CONFIG_CREATE_RESPONSE } from './forum';

//import { URL_BACKEND_API } from './config';



import { Subject } from 'rxjs/Subject';




@Injectable()
export class Test {

    private count: number = 0;

    form = <USER_REGISTER> {};
    session_id = new Subject<string>();

    constructor(
        // private forum: Forum,
        private backend: Backend,
        private user: User
    ) {
        //console.info('Test::constructor()');
        setTimeout( () => this.run(), 100 );
    }


    private run() {
        //console.info('Test::run()');
        this.result();
        //this.system();
        //this.register();

        // this.session_id.subscribe( id => this.login(id) );
        
        // this.forumCreate( () => this.postCreate() );
    }

    success( str ) {
        this.count ++;
        console.info(`[${this.count}] SUCCESS: ${str}`);
    }
    
    result() {


        this.backend.successCall().subscribe( re => {
            this.success("Version: " + re['data']['version']);
        }, err => this.error( err ) );

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

        
        this.backend.timeoutError().subscribe( re => {
            console.error( re, "This should be timeout error. But success." );
        }, error => {
            if ( error.message == ERROR_TIMEOUT ) {
                this.success('This should be timeout error. ' + this.backend.getErrorString( error ));
            }
            else this.error( error, "This is not timeout error. But another error");
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
        this.form.birthday = '1990-12-30';

        this.user.register( this.form ).subscribe( (res: USER_REGISTER_RESPONSE ) => {
            if ( this.user.isError( res ) ) this.error( res );
            else {
                // console.log( res );
                this.success("User registration");
                this.session_id.next( res.data.session_id );
            }
        }, error => {
            this.error( error );
        } );
    }

    login( session_id ) {
        //console.log("with session_id: ", session_id );
        this.user.login( this.form ).subscribe( ( res: USER_LOGIN ) => {
            if ( this.user.isError( res ) ) this.error( res );
            else this.success( "Login success" );
        }, error => {
            this.error( error );
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