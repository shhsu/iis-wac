
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActionsModule } from '@msft-sme/angular';
import { IISActionsComponent } from './iis-actions.component';
import { IISTableActionsComponent } from './iis-table-actions.component';
import { StatusChangeActionsComponent } from './status-change-actions.component';

@NgModule({
    imports: [
        CommonModule,
        ActionsModule,
    ],
    declarations: [
        IISActionsComponent,
        IISTableActionsComponent,
        StatusChangeActionsComponent,
    ],
    exports: [
        IISActionsComponent,
        IISTableActionsComponent,
        StatusChangeActionsComponent,
    ],
})
export class IISActionsModule { }
