import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IISDialogModule } from 'src/app/iis-mgmt/shared-components/dialog/iis-dialog.module';
import { IISFormComponent } from './iis-form.component';

@NgModule({
    imports: [
        CommonModule,
        IISDialogModule,
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
