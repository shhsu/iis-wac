import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataTableModule } from '@msft-sme/angular';
import { IISActionsModule } from 'src/app/iis-mgmt/shared-components/actions/iis-actions.module';
import { IISDialogModule } from 'src/app/iis-mgmt/shared-components/dialog/iis-dialog.module';
import { Module as ListsModule } from 'src/app/iis-mgmt/shared-components/loaders/list-loader.component';
import { CertificateModule } from 'src/app/iis-mgmt/webserver/certificate/certificate.module';
import { BindingListComponent } from './binding-list.component';
import { BindingComponent } from './binding.component';

@NgModule({
    imports: [
        CommonModule,
        DataTableModule,
        ListsModule,
        IISDialogModule,
        IISActionsModule,
        CertificateModule,
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
