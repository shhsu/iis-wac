
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '@msft-sme/angular';
import { IISFormModule } from 'src/app/iis-mgmt/shared-components/form/iis-form.module';
import { IISCollectionDialogComponent } from './iis-collection-dialog.component';
import { IISDialogComponent } from './iis-dialog.component';
import { IISSelectorDialogComponent } from './iis-selector-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        DialogModule,
        IISFormModule,
    ],
    declarations: [
        IISDialogComponent,
        IISCollectionDialogComponent,
        IISSelectorDialogComponent,
    ],
    exports: [
        IISDialogComponent,
        IISCollectionDialogComponent,
        IISSelectorDialogComponent,
    ],
})
export class IISDialogModule {
}
