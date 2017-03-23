import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Backend } from './model/backend';
import { User } from './model/user';
import { PostData } from './model/post-data';
import { PostConfig } from './model/post-config';
import { Test } from './test/test';
import { File } from './model/file';
import { ProgressService } from "./service/progress";
import { BrowserXhr } from "@angular/http";
import { CustomBrowserXhr } from "./service/custom-browser-xhr";



export * from './interface';
export { Backend } from './model/backend';
export { User } from './model/user';
export { PostConfig } from './model/post-config';
export { PostData } from './model/post-data';
export { File } from './model/file';
export { Test } from './test/test';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
  ],
    providers: [ Backend,
      User,
      PostConfig,
      PostData,
      Test,
      File,
      ProgressService,
      { provide: BrowserXhr, useClass: CustomBrowserXhr } ]
})
export class AngularBackend {}


