import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '@msft-sme/angular';
import { IISErrorDialogComponent } from './iis-error-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        DialogModule,
    ],
    declarations: [
        IISErrorDialogComponent,
    ],
    exports: [
        IISErrorDialogComponent,
    ],
})
export class IISErrorDialogModule {
}
