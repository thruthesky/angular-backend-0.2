import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  BackendAdminPage,
  BackendAdminUserListPage,
  BackendAdminUserEditPage,
  BackendAdminForumConfigPage,
  BackendAdminForumCategoryPage,
  BackendAdminForumPostPage
} from './angular-backend-admin';

const AdminModuleRouting = [
  { path: 'admin/user', component: BackendAdminUserListPage },
  { path: 'admin/user/edit/:idx', component: BackendAdminUserEditPage },
  { path: 'admin/forum', component: BackendAdminForumConfigPage },
  { path: 'admin/forum/configs', component: BackendAdminForumConfigPage },
  { path: 'admin/forum/categories', component: BackendAdminForumCategoryPage },
  { path: 'admin/forum/posts', component: BackendAdminForumPostPage },
  { path: 'admin/forum/posts/:post_config_id', component: BackendAdminForumPostPage },

  { path: 'admin', component: BackendAdminPage },
];
@NgModule({
    imports: [
        RouterModule.forChild( AdminModuleRouting )
    ],
    exports: [ RouterModule ]
})
export class AngularBackendAdminRoutingModule {}