import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule, SmeFormsModule } from '@msft-sme/angular';
import { IISActionsModule } from 'src/app/iis-mgmt/shared-components/actions/iis-actions.module';
import { IISDialogModule } from 'src/app/iis-mgmt/shared-components/dialog/iis-dialog.module';
import { IISDropdownModule } from 'src/app/iis-mgmt/shared-components/dropdown/iis-dropdown.module';
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
        IISDropdownModule,
        FormsModule,
        ReactiveFormsModule,
        SmeFormsModule,
    ],
    declarations: [
        BindingComponent,
        BindingListComponent,
    ],
    exports: [
        BindingComponent,
        BindingListComponent,
    ],
})
export class BindingModule {
}
