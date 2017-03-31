import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector:'post-edit-modal',
    templateUrl: 'edit.html',
    styleUrls: ['edit.scss']
})

export class PostEditModalComponent{
    postIdx: string = '##################################';
    constructor() {

    }
}
