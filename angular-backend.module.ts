import { NgModule } from '@angular/core';
import { Backend } from './backend';
import { User } from './user';
import { Test } from './test';
@NgModule({
    providers: [ Backend, User, Test ]
})
export class AngularBackendModule {}
