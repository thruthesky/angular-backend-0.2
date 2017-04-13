import { Component } from '@angular/core';
import { AdminService } from './../services/admin.service';

//import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

import { File, _FILE
} from './../../../angular-backend';
@Component({
  selector: 'backend-admin-file-list',
  templateUrl: 'file.html',
  styleUrls:['file.scss']
})
export class BackendAdminFileListPage {

  files: Array<_FILE>;
  constructor(
    public admin: AdminService,
    public file: File
  ) {

    admin.onClickMenuMore();
    console.log('file:management');

    this.file.list({limit: 100}).subscribe( res => {
      console.log('file.list::',res);
      this.files = res.data.files;
    }, err => {
      this.file.alert(err);
    })

  }
}
