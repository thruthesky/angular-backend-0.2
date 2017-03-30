import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';
import { FILE_UPLOAD, FILE_UPLOAD_RESPONSE, IMG_SRC,

  UPLOAD,
  PRIMARY_PHOTO_UPLOAD,
  ANONYMOUS_PRIMARY_PHOTO_UPLOAD
 } from "../interface";
import { ProgressService } from "../services/progress";
import { Observable } from "rxjs";
import { URL_BACKEND_API } from "../config";
export * from '../interface';
export * from '../define';
@Injectable()
export class File extends Base {
  protected percentage: number = 0;
  constructor( http: Http, private progress: ProgressService) {
    super( http, 'file' );
  }


  uploadAnonymousPrimaryPhoto( req: ANONYMOUS_PRIMARY_PHOTO_UPLOAD, file: any ) : Observable< FILE_UPLOAD_RESPONSE > {
    return this.upload( req, file );
  }
  uploadPrimaryPhoto( req: PRIMARY_PHOTO_UPLOAD, file: any ) : Observable< FILE_UPLOAD_RESPONSE > {
    return this.upload( req, file );
  }


  upload( req:UPLOAD, file: any ) : Observable< FILE_UPLOAD_RESPONSE > {
    //
    // req.route = 'upload';
    // req.session_id = this.getSessionId();
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
    let o = this.http.post( URL_BACKEND_API, formData);

    let subscription = this.progress.uploadProgress.subscribe( res => {
      console.log("progress: ", res);
      console.log('total::', res.total, 'Loaded::', res.loaded);
      this.percentage = Math.round(res.loaded/res.total*100);
      console.log('this.percentage::',this.percentage);
      console.log(subscription);
      if ( this.percentage == 100 ) subscription.unsubscribe();
    });

    return this.processQuery( o );
    //   .subscribe(res=>{
    //   console.info("file upload success: ", res);
    // }, err => {
    //   console.error(err);
    // })
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
}
