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

import { BackendAdminForumConfigPage } from './pages/admin/forum/config/config';
export { BackendAdminForumConfigPage } from './pages/admin/forum/config/config';

import { BackendAdminForumCategoryPage } from './pages/admin/forum/category/category';
export { BackendAdminForumCategoryPage } from './pages/admin/forum/category/category';

import { BackendAdminForumPostPage } from './pages/admin/forum/post/post';
export { BackendAdminForumPostPage } from './pages/admin/forum/post/post';


import { AdminHeaderComponent } from './pages/admin/components/header/header';
import { AdminSidebarComponent } from './pages/admin/components/sidebar/sidebar';

import { InfoBoxComponent } from './pages/components/info-box/info-box';
import { ProgressGroupComponent } from './pages/components/progress-group/progress-group';

import { AdminService } from './pages/admin/services/admin.service';


import { AngularBackendComponentModule } from './modules/angular-backend-components.module';

import { PostEditModalComponent } from './pages/admin/components/modal/post/edit/edit';
import { AngularBackendAdminRoutingModule } from './angular-backend-admin.routing';

@NgModule({
  declarations: [
    BackendAdminPage,
    BackendAdminUserListPage,
    BackendAdminUserEditPage,
    BackendAdminForumConfigPage,
    BackendAdminForumCategoryPage,
    BackendAdminForumPostPage,
    AdminHeaderComponent,
    AdminSidebarComponent,
    InfoBoxComponent,
    ProgressGroupComponent,
    PostEditModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AngularBackendComponentModule,
    AngularBackendAdminRoutingModule
  ],
  providers: [ AdminService ],
  entryComponents: [
    PostEditModalComponent
  ]
})
export class AngularBackendAdmin {}


