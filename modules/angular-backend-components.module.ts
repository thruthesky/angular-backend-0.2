import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageNavigationComponent } from './components/pagination/pagination.component';
import { PostFormBasicComponent } from './components/post-form-basic/post-form-basic-component';
import { FileFormBasicComponent } from './components/file-form-basic/file-form-basic-component';
@NgModule({
    declarations: [
        PageNavigationComponent,
        PostFormBasicComponent,
        FileFormBasicComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        PageNavigationComponent,
        PostFormBasicComponent,
        FileFormBasicComponent
    ]
})
export class AngularBackendComponentModule {}