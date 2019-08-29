import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IISErrorDialogModule } from 'src/app/iis-mgmt/shared-components/dialog/error/iis-error-dialog.module';
import { IISFormComponent } from './iis-form.component';

@NgModule({
    imports: [
        CommonModule,
        IISErrorDialogModule,
    ],
    declarations: [
        IISFormComponent,
    ],
    exports: [
        IISFormComponent,
    ],
})
export class IISFormModule {
}
