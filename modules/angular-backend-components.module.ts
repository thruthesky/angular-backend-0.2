import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageNavigationComponent } from './components/pagination/pagination.component';
import { PostFormBasicComponent } from './components/post-form-basic/post-form-basic-component';
import { PostViewBasicComponent } from './components/post-view-basic/post-view-basic-component';

import { CommentFormBasicComponent } from './components/comment-form-basic/comment-form-basic-component';
import { CommentViewBasicComponent } from './components/comment-view-basic/comment-view-basic-component';


import { RegisterFormBasicComponent } from './components/register-form-basic/register-form-basic-component';
import { LoginFormBasicComponent } from './components/login-form-basic/login-form-basic-component';

import { PaswordChangeFormBasicComponent } from './components/password-change-form-basic/password-change-form-basic-component';
import { FileFormBasicComponent } from './components/file-form-basic/file-form-basic-component';
@NgModule({
    declarations: [
        PageNavigationComponent,
        PostFormBasicComponent,
        PostViewBasicComponent,
        CommentFormBasicComponent,
        CommentViewBasicComponent,
        RegisterFormBasicComponent,
        LoginFormBasicComponent,
        FileFormBasicComponent,
        PaswordChangeFormBasicComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        PageNavigationComponent,
        PostFormBasicComponent,
        PostViewBasicComponent,
        CommentFormBasicComponent,
        CommentViewBasicComponent,
        RegisterFormBasicComponent,
        LoginFormBasicComponent,
        FileFormBasicComponent,
        PaswordChangeFormBasicComponent
    ]
})
export class AngularBackendComponentModule {}