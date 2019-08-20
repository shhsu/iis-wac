
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '@msft-sme/angular';
import { IISDialogComponent } from './iis-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        DialogModule,
    ],
    declarations: [
        IISDialogComponent,
    ],
    exports: [
        IISDialogComponent,
    ],
})
export class IISDialogModule {
}
