import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Base } from './base';
import {
  FILE_UPLOAD, FILE_UPLOAD_RESPONSE, IMG_SRC,
  UPLOAD,
  PRIMARY_PHOTO_UPLOAD,
  ANONYMOUS_PRIMARY_PHOTO_UPLOAD,
  UPLOAD_RESPONSE
 } from "../angular-backend";
import {
  ERROR_SESSION_ID_EXIST,
  RES_ERROR_NO_FILE_SELECTED
} from './../define';
import { ProgressService } from "../services/progress";
import { Observable } from "rxjs";
import { URL_BACKEND_API } from "../config";
export * from '../interface';
export * from '../define';


type CALLBACK_NUMBER = (percentage: number) => void;
@Injectable()
export class File extends Base {
  protected percentage: number = 0;
  constructor(
    http: Http, private progress: ProgressService
  ) {
    super( http, 'file' );
  }



  upload( req:UPLOAD, file: any, callback?: CALLBACK_NUMBER ) : Observable< FILE_UPLOAD_RESPONSE > {
    
    
    if ( file === void 0 || file.name === void 0 ) {
      return Observable.throw( RES_ERROR_NO_FILE_SELECTED );
    }
    
    let session_id = this.getSessionId();
    let formData = new FormData();
    formData.append( 'userfile', file, file.name);
    formData.append( 'route', 'upload');
    if ( session_id ) formData.append( 'session_id' , session_id);
    if ( req['model'] ) formData.append( 'model', req.model );
    if ( req['model_idx'] ) formData.append( 'model_idx', req.model_idx );
    if ( req['code'] ) formData.append( 'code', req.code );
    if ( req['unique'] ) formData.append( 'unique', req.unique );
    if ( req['finish'] ) formData.append( 'finish', req.finish );
    

    console.log( file );
    console.log( formData ) ;
    let o: Observable<any> = this.http.post( URL_BACKEND_API, formData );




    let subscription = this.progress.uploadProgress.subscribe( res => {
      // console.log("progress: ", res);
      // console.log('total::', res.total, 'Loaded::', res.loaded);
      this.percentage = Math.round(res.loaded/res.total*100);
      // console.log('this.percentage::',this.percentage);
      // console.log(subscription);


      if ( callback ) callback( this.percentage );
      if ( this.percentage == 100 ) subscription.unsubscribe();


    });

    return this.processQuery( o );
  }

  url( idx: number ) : string {
    return URL_BACKEND_API + '?route=download&idx='+idx;
  }
  src( option: IMG_SRC ) {
    let url = this.url( option.idx );
    if ( option['width'] ) url += 'width=' + option.width;
    if ( option['height'] ) url += 'height=' + option.height;
    if ( option['quality'] ) url += 'quality=' + option.quality;
    if ( option['resize'] ) url += 'resize=' + option.resize;
    console.log('file.src() returns: ', url);
    return url;
  }



  //// User Primary Photo Upload

  private uploadAnonymousPrimaryPhoto( file: any, callback?: CALLBACK_NUMBER ) : Observable< FILE_UPLOAD_RESPONSE > { 
    let req: ANONYMOUS_PRIMARY_PHOTO_UPLOAD = {
      model: 'user',
      code: 'primary_photo'
    };
    return this.upload( req, file, callback );
  }
  private uploadUserPrimaryPhoto( file: any, callback?: CALLBACK_NUMBER ) : Observable< FILE_UPLOAD_RESPONSE > {
    let req: PRIMARY_PHOTO_UPLOAD = {
      model: 'user',
      model_idx: this.info.idx,
      code: 'primary_photo',
      unique: 'Y',
      finish: 'Y'
    };
    return this.upload( req, file, callback );
  }
  
  uploadPrimaryPhoto( file, callback?: CALLBACK_NUMBER ) {
    if ( this.logged ) return this.uploadUserPrimaryPhoto( file );
    else return this.uploadAnonymousPrimaryPhoto( file, callback );
  }




  /**
   * 
   * File upload for post
   * 
   * 
   * @param file 
   * @param callback 
   * 
   * @code

    onChangeFile( _ ) {
        this.file.uploadPostFile( _.files[0], percentage => {
            console.log('percentage:', percentage);
        } ).subscribe( (res:_UPLOAD_RESPONSE) => {
            this.files.push( res.data );
            console.log('files: ', this.files);
        }, err => {
            console.log('err:', err);
            if ( this.file.isError(err) == ERROR_NO_FILE_SELECTED ) return;
            this.file.alert(err);
        });
    }

   * @endcode
   * 
   */
  uploadPostFile( file, callback?: CALLBACK_NUMBER ) : Observable<UPLOAD_RESPONSE> {
    let req: UPLOAD = {
      model: 'post_data',
      code: ''
    };
    return this.upload( req, file, callback );
  }
}
