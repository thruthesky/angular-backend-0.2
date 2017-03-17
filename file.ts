import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';
import { FILE_UPLOAD } from "./interface";
import { ProgressService } from "./service/progress";
import { Observable } from "rxjs";
import { URL_BACKEND_API } from "./config";
export * from './interface';
export * from './define';
@Injectable()
export class File extends Base {
  percentage: number = 0;
  constructor( http: Http, progress: ProgressService) {
    super(http);

    progress.uploadProgress.subscribe( res => {
      console.log("progress: ", res);

      console.log('total::', res.total, 'Loaded::', res.loaded);
      this.percentage = Math.round(res.loaded/res.total*100);
      console.log('this.percentage::',this.percentage);
    });
  }

  upload( req:FILE_UPLOAD, file ): Observable<any>{

    //
    // req.route = 'upload';
    // req.session_id = this.getSessionId();
    let formData = new FormData();
    formData.append( 'userfile', file, file.name);
    formData.append('route', 'upload');
    formData.append('session_id' , this.getSessionId());
    formData.append( 'model', req.model );
     formData.append( 'model_idx', req.model_idx );
     formData.append( 'code', req.code );
    return this.http.post( URL_BACKEND_API, formData);
    //   .subscribe(res=>{
    //   console.info("file upload success: ", res);
    // }, err => {
    //   console.error(err);
    // })
  }
}
