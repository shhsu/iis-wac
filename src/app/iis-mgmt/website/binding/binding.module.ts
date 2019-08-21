import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActionsModule, DataTableModule } from '@msft-sme/angular';
import { IISDialogModule } from 'src/app/iis-mgmt/shared-components/dialog/iis-dialog.module';
import { Module as ListsModule } from 'src/app/iis-mgmt/shared-components/loaders/list-loader.component';
import { BindingListComponent } from './binding-list.component';
import { BindingComponent } from './binding.component';

@NgModule({
    imports: [
        ActionsModule,
        CommonModule,
        DataTableModule,
        ListsModule,
        IISDialogModule,
    ],
    declarations: [
        BindingComponent,
        BindingListComponent,
    ],
    exports: [
        BindingListComponent,
    ],
})
export class BindingModule {
}
