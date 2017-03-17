import { NgModule } from '@angular/core';
import { Backend } from './backend';
import { User } from './user';
import { Test } from './test';
import { File } from './file';
import { ProgressService } from "./service/progress";
import { BrowserXhr } from "@angular/http";
import { CustomBrowserXhr } from "./service/custom-browser-xhr";
export { Backend } from './backend';
export * from './interface';
export { User } from './user';
export { Test } from './test';
@NgModule({
    providers: [ Backend,
      User,
      Test,
      File,
      ProgressService,
      { provide: BrowserXhr, useClass: CustomBrowserXhr } ]
})
export class AngularBackendModule {}


