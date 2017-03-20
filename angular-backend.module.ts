import { NgModule } from '@angular/core';
import { Backend } from './backend';
import { User } from './user';
import { Post } from './post';
import { Test } from './test';
export { Backend } from './backend';
export * from './interface';
export { User } from './user';
export { Test } from './test';
@NgModule({
    providers: [ Backend, User, Test, Post ]
})
export class AngularBackendModule {}
