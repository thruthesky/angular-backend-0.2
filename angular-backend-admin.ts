import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BackendAdminPage } from './pages/admin/index/index';
export { BackendAdminPage } from './pages/admin/index/index';

import { AdminHeaderComponent } from './pages/admin/components/header/header';
import { AdminSidebarComponent } from './pages/admin/components/sidebar/sidebar';

import { InfoBoxComponent } from './pages/components/info-box/info-box';
import { ProgressGroupComponent } from './pages/components/progress-group/progress-group';

import { AdminService } from './pages/admin/services/admin.service';

@NgModule({
  declarations: [
    BackendAdminPage,
    AdminHeaderComponent,
    AdminSidebarComponent,
    InfoBoxComponent,
    ProgressGroupComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [ AdminService ]
})
export class AngularBackendAdmin {}


