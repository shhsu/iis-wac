
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '@msft-sme/angular';
import { CreateDialogComponent } from './create-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        DialogModule,
    ],
    declarations: [
        CreateDialogComponent,
    ],
    exports: [
        CreateDialogComponent,
    ],
})
export class IISDialogModule {
}
