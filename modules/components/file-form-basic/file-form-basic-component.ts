import { Component, Input, NgZone } from '@angular/core';
import {
    File,
    _FILE,
    _UPLOAD_RESPONSE, _DELETE_RESPONSE
} from './../../../angular-backend';

import {
    ERROR_NO_FILE_SELECTED
} from './../../../define';
@Component({
    selector: 'file-form-basic-component',
    templateUrl:'./file-form-basic-component.html',
    styleUrls: [ './file-form-basic-component.scss' ]
})
export class FileFormBasicComponent {

    @Input() files: Array<_FILE>; // pass-by-reference.

    percentage: number = 0;
    constructor( private file: File, private ngZone: NgZone ) {

    }


    onChangeFile( _ ) {
        this.percentage = 1;
        this.file.uploadPostFile( _.files[0], percentage => {
            console.log('percentage:', percentage);
            this.percentage = percentage;
            this.ngZone.run( () => {} );
        } ).subscribe( (res:_UPLOAD_RESPONSE) => {
            this.files.push( res.data );
            console.log('files: ', this.files);
            this.percentage = 0;
        }, err => {
            console.log('err:', err);
            if ( this.file.isError(err) == ERROR_NO_FILE_SELECTED ) return;
            this.file.alert(err);
        });
    }




    onClickDeleteFile( file ) {
        console.log("FileFormComponent::onClickDeleteFile(file): ", file);
        this.file.delete( file.idx ).subscribe( (res:_DELETE_RESPONSE) => {
            console.log("file delete: ", res);
            let i = this.files.findIndex( (f:_FILE) => f.idx == res.data.idx );
            // Object.assign( this.files, files );

            this.files.splice( i, 1 );

            console.log('files: ', this.files);
        }, err => this.file.alert(err) );
    }



}