import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URL_BACKEND_API, BACKEND_API_CONNECTION_TIMEOUT } from './config';

import { RESPONSE, SESSION_INFO, USER_SESSION_RESPONSE } from './interface';

import { API_KEY_SESSION_INFO, ERROR_JSON_PARSE, ERROR_TIMEOUT } from './define';



import { TimeoutError } from 'rxjs/Rx';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';



export class Api {
    public http: Http;
    constructor( http ) {
        this.http = http;
    }





    /**
     *
     * @param error_code
     * @param error_message
     *
     * @code
     *      this.errorResponse( 'error-code' ); // Simply put error code
     *      this.errorResponse( -1234, 'error-message' ); // Error code with message. error code must be less than 0
     * @endcode
     *
     */
    errorResponse( error_code, error_message = '' ) : RESPONSE {
        if ( error_message ) {
            return { code: error_code, message: error_message };
        }
        else {
            return {
                code: -999,
                message: error_code
            };
        }
    }

    /**
     *
     *
     *
     * @param code
     * @param message
     */
    protected error( code, message ) {
         return Observable.throw( this.errorResponse( -420, "user-not-logged-in" ));
    }


    protected get requestOptions() : RequestOptions {
        let headers  = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options  = new RequestOptions({ headers: headers });
        return options;
    }



    get logged() : boolean {
        if ( this.getSessionId() ) return true;
        else return false;
    }

    /**
     * @deprecated use session info.
     * @param res
     */
    /*
    setSessionId( res: USER_LOGIN_RESPONSE ) {
      if ( res === void 0 || res.data === void 0 || res.data.session_id === void 0 ) {
        alert("CRITICAL ERROR: sessionSessionId() - please report this to admin.");
        return;
      }
      localStorage.setItem( API_KEY_SESSION_INFO, res.data.session_id );
    }
    */

    /**
     *
     * @param res - it can by any interface ( type ) as long as it has res.data.sessoin_id
     */
    protected setSessionInfo( res: USER_SESSION_RESPONSE ) {
        if ( res === void 0 || res.data === void 0 || res.data.session_id === void 0 ) {
            // No session_id will be returned if admin edits user info.
            // alert("CRITICAL ERROR: sessionSessionId() - please report this to admin.");
            return;
        }
        localStorage.setItem( API_KEY_SESSION_INFO, JSON.stringify( res.data ) );
    }

    // getSessionInfo() : SESSION_INFO {
    //     let data = localStorage.getItem( API_KEY_SESSION_INFO );
    //     //console.log(data);
    //     if ( data ) {
    //         try {
    //             return JSON.parse( data );
    //         }
    //         catch (e) {
    //             return null;
    //         }
    //     }
    //     else return null;

    // }

    getSessionId() : string {
        return this.info.session_id;
        // let info = this.getSessionInfo();
        // // console.info(info);
        // if ( info ) return info.session_id;
        // // return localStorage.getItem( API_KEY_SESSION_INFO );
        // else return null;
    }

    /**
     * this.info.id
     */
    get info() : SESSION_INFO {
        let data = localStorage.getItem( API_KEY_SESSION_INFO );
        //console.log(data);
        if ( data ) {
            try {
                return JSON.parse( data );
            }
            catch (e) {
            }
        }
        return <SESSION_INFO>{};
    }



    protected deleteSessionInfo() {
        localStorage.removeItem( API_KEY_SESSION_INFO );
    }





    /**
     *
     *
     * Returns 'Observable' which gives an Object of 'sucess' or 'error' from PHP Backend.
     *
     */

    post( data: any, option = {} ) : any {

        let session_id = this.getSessionId();
        //console.log(session_id);
        if ( session_id ) data['session_id'] = session_id;

        data = this.buildQuery( data );

        let url = URL_BACKEND_API + '?' + data;
        console.log("post: ", url); // debug in console

        let o = this.http.post( URL_BACKEND_API, data, this.requestOptions )
        return this.processQuery( o, option );
    }




    /**
     *
     * Returns 'Observable' which gives an Object of 'sucess' or 'error' from PHP Backend.
     *
     * @attension If there is error on json(), then 'error' callback will be called on subscribe.
     *      만약, json() 또는 JSON.parse() 에서 에러가 발생하면, subscribe() 을 에러 콜백이 호출된다.
     */
    get( url: string, option = {} ) : Observable<Response> {

        //return this.http.get( url )
        return this.processQuery( this.http.get( url ), option );


    }

    protected processQuery( o: Observable<Response>, option = {} ) {
        let timeout = BACKEND_API_CONNECTION_TIMEOUT;
        if ( option['timeout'] !== void 0 ) timeout = option['timeout'];
        return o
            .timeout( timeout )
            .catch( err => {
                //console.log("catch() after .timeout()");
                //console.log(err);
                if ( err instanceof TimeoutError ) {
                    return Observable.throw( this.errorResponse( ERROR_TIMEOUT ) );
                }
                return Observable.throw( err );
            })

            .map( (e) => {
                ///
                if ( e['_body'] == '' ) throw this.errorResponse( -408, 'response-is-empty.');
                
                console.log(e['_body']); // debug. comment out to see errors from server.
                let re = e.json();
                if ( this.isError( re ) ) {
                    throw re;
                }
                else return re;
             } )
            .catch( err => {
                if ( err instanceof SyntaxError ) {
                    console.error(err); // debug
                    return Observable.throw( this.errorResponse( ERROR_JSON_PARSE )  ); // JSON 에러
                }
                else if ( err && typeof err['code'] !== void 0 && err['code'] < 0 ) return Observable.throw( err ); // 프로그램 적 에러
                else return Observable.throw( err );
            } );
    }




    /**
     * return true if the obj is error.
     *
     *
     * obj { code: ... } 에서 code 값이 없거나 참의 값이면 에러로 간주한다.
     *
     * 참고로 internal sever error 의 경우에는 code 값이 없으로 '참'을 리턴한다.
     */
    isError( obj: any ) {
        if ( obj ) {
            if ( obj['code'] === void 0 ) return true; // if obj.code not exist.
            if ( obj['code'] ) return true; // if obj.code is not 0.
        }
        return false;
    }
    /**
     * Returns true if it is an internal server error response.
     *
     *
     * @param obj
     */
    isInternalServerError( obj ) {
        return typeof obj['status'] !== void 0 && obj['status'] == 500;
    }
    getErrorString( error: any ) {
        if ( typeof error['status'] != 'undefined' ) {
            if ( error['status'] == 500 ) return "500 ( INTERNAL SERVER ERROR ) : It is a server error.";
            else return  "ERROR RESPONSE CODE: " + error['status'];
        }
        else if ( error === void 0 ) {
            return 'No error data';
        }
        else if ( error['code'] == void 0 ) {
            return "No error code";
        }
        else if ( error['message'] == ERROR_JSON_PARSE ) {
          return "ERROR: JSON PARSE ERROR: This may be PHP script error. " + error['message'];
        }
        else if ( error['message'] == ERROR_TIMEOUT ) {
          return "ERROR: JSON PARSE ERROR: This may be PHP script error. " + error['message'];
        }
        else if ( typeof error['code'] != 'undefined' ) {
            return (`ERROR: ${error['code']} : ${error['message']}` );
        }
        else {
            return "unhandled error: ";
            // alert("CRITICAL - UNHANDLED ERROR"); // this should never happen
        }
    }
    /**
     *
     * This simply alerts error message on browser.
     *
     * @param error
     */
    alert( error ) {
        alert( this.getErrorString( error ) );
    }

    // errorHandler( error ) {
    //     if ( error['code'] !== void 0 ) {
    //         console.info( "ERROR: ", error['message'] );
    //     }
    //     else if ( error['status'] !== void 0 ) {
    //         if ( error['status'] == 500 ) console.info("INTERNAL ERROR: It is a server error.");
    //         else console.info("ERROR RESPONSE CODE: ", error['status'] );
    //     }
    //     else if ( error == df.ERROR_JSON_PARSE ) {
    //       console.info("ERROR: JSON PARSE ERROR: ", error);
    //     }
    //     else {
    //         console.log("unhandled error:", error );
    //         alert("CRITICAL - UNHANDLED ERROR"); // this should never happen
    //     }
    // }

    version() {
        return this.get( URL_BACKEND_API + '?route=version');
    }

    errorCall() {
        return this.get( URL_BACKEND_API + '?route=system.error');
    }
    successCall() {
        return this.version();
    }
    scriptError() {
        return this.get( URL_BACKEND_API + '?route=system.scriptError');
    }
    timeoutError() {
        return this.get( URL_BACKEND_API + '?route=system.timeoutError', { 'timeout': 1000 } );
    }

    internalServerError() {
        return this.get( URL_BACKEND_API + '?route=system.internalServerError');
    }
    routeMethodError() {
        return this.get( URL_BACKEND_API + '?route=system.routeMethodError' );
    }
    routeRequiredError() {
        return this.get( URL_BACKEND_API + '?route=system.routeRequiredError' );
    }




  /**
   * Returns the body of POST method.
   *
   * @attention This addes 'module', 'submit'. If you don't needed just user http_build_query()
   *
   * @param params must be an object.
   */
  protected buildQuery( params ) {
    // params[ 'module' ] = 'ajax'; // 'module' must be ajax.
    // params[ 'submit' ] = 1; // all submit must send 'submit'=1
    return this.http_build_query( params );
  }




  protected http_build_query (formdata, numericPrefix='', argSeparator='') {
    var urlencode = this.urlencode;
    var value
    var key
    var tmp = []
    var _httpBuildQueryHelper = function (key, val, argSeparator) {
      var k
      var tmp = []
      if (val === true) {
        val = '1'
      } else if (val === false) {
        val = '0'
      }
      if (val !== null) {
        if (typeof val === 'object') {
          for (k in val) {
            if (val[k] !== null) {
              tmp.push(_httpBuildQueryHelper(key + '[' + k + ']', val[k], argSeparator))
            }
          }
          return tmp.join(argSeparator)
        } else if (typeof val !== 'function') {
          return urlencode(key) + '=' + urlencode(val)
        } else {
          throw new Error('There was an error processing for http_build_query().')
        }
      } else {
        return ''
      }
    }

    if (!argSeparator) {
      argSeparator = '&'
    }
    for (key in formdata) {
      value = formdata[key]
      if (numericPrefix && !isNaN(key)) {
        key = String(numericPrefix) + key
      }
      var query = _httpBuildQueryHelper(key, value, argSeparator)
      if (query !== '') {
        tmp.push(query)
      }
    }

    return tmp.join(argSeparator)
  }



  protected urlencode (str) {
    str = (str + '')
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/%20/g, '+')
  }


}
