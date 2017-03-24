import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNavigationComponent } from './components/pagination/pagination.component';
@NgModule({
    declarations: [
        PageNavigationComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PageNavigationComponent
    ]
})
export class AngularBackendComponentModule {}