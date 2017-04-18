import { NgModule } from '@angular/core';
import { Backend } from './model/backend';
import { User } from './model/user';
import { PostData } from './model/post-data';
import { PostConfig } from './model/post-config';
import { PostComment } from './model/post-comment';
import { Test } from './test/test';
import { File } from './model/file';
import { Meta } from './model/meta';
import { Category } from "./model/category";
import { ProgressService } from "./services/progress";
import { BrowserXhr } from "@angular/http";
import { CustomBrowserXhr } from "./services/custom-browser-xhr";

export * from './interface';
export * from './define';
export { Backend } from './model/backend';
export { User } from './model/user';
export { PostConfig } from './model/post-config';
export { PostData } from './model/post-data';
export { PostComment } from './model/post-comment';
export { File } from './model/file';
export { Meta } from './model/meta';
export { Category } from './model/category';
export { Test } from './test/test';

@NgModule({
  declarations: [],
  imports: [],
    providers: [ Backend,
      User,
      PostConfig,
      PostData,
      PostComment,
      Test,
      File,
      Meta,
      Category,
      ProgressService,
      { provide: BrowserXhr, useClass: CustomBrowserXhr } ]
})
export class AngularBackend {}


