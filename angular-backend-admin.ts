import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BackendAdminPage } from './pages/admin/index/index';
export { BackendAdminPage } from './pages/admin/index/index';

import { BackendAdminUserListPage} from './pages/admin/user/list/list';
export { BackendAdminUserListPage } from './pages/admin/user/list/list';

import { BackendAdminUserEditPage} from './pages/admin/user/edit/edit';
export { BackendAdminUserEditPage } from './pages/admin/user/edit/edit';


import { BackendAdminForumPage } from './pages/admin/forum/forum';
export { BackendAdminForumPage } from './pages/admin/forum/forum';




import { AdminHeaderComponent } from './pages/admin/components/header/header';
import { AdminSidebarComponent } from './pages/admin/components/sidebar/sidebar';

import { InfoBoxComponent } from './pages/components/info-box/info-box';
import { ProgressGroupComponent } from './pages/components/progress-group/progress-group';

import { AdminService } from './pages/admin/services/admin.service';


import { AngularBackendComponentModule } from './modules/angular-backend-components.module';

@NgModule({
  declarations: [
    BackendAdminPage,
    BackendAdminUserListPage,
    BackendAdminUserEditPage,
    BackendAdminForumPage,
    AdminHeaderComponent,
    AdminSidebarComponent,
    InfoBoxComponent,
    ProgressGroupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AngularBackendComponentModule
  ],
  providers: [ AdminService ]
})
export class AngularBackendAdmin {}


