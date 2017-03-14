import { NgModule } from '@angular/core';
import { Backend } from './backend';
import { User } from './user';
import { Test } from './test';
export { Backend } from './backend';
export * from './interface';

@NgModule({
    providers: [ Backend, User, Test ]
})
export class AngularBackendModule {}
