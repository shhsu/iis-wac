
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '@msft-sme/angular';
import { IISCollectionDialogComponent } from './iis-collection-dialog.component';
import { IISDialogComponent } from './iis-dialog.component';
import { IISErrorDialogComponent } from './iis-error-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        DialogModule,
    ],
    declarations: [
        IISDialogComponent,
        IISCollectionDialogComponent,
        IISErrorDialogComponent,
    ],
    exports: [
        IISDialogComponent,
        IISCollectionDialogComponent,
        IISErrorDialogComponent,
    ],
})
export class IISDialogModule {
}
