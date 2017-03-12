import { NgModule } from '@angular/core';
import { Backend } from './backend';
import { User } from './user';
import { Test } from './test';
export { Backend } from './backend';
export { User } from './user';
export { Test } from './test';
export * from './interface';

@NgModule({
    providers: [ Backend, User, Test ]
})
export class AngularBackendModule {}
