
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule, PivotModule, SmeFormsModule } from '@msft-sme/angular';
import { FileExplorerLibModule } from '@msft-sme/file-explorer';
import { FileExplorerFormsModule } from '@msft-sme/file-explorer/dist/app/file-explorer/form-fields/file-explorer-forms.module';
import { AppPoolListModule } from 'src/app/iis-mgmt/app-pool/list/app-pool-list.module';
import { IISActionsModule } from 'src/app/iis-mgmt/shared-components/actions/iis-actions.module';
import { IISDialogModule } from 'src/app/iis-mgmt/shared-components/dialog/iis-dialog.module';
import { IISFormModule } from 'src/app/iis-mgmt/shared-components/form/iis-form.module';
import { Module as LoaderModule } from 'src/app/iis-mgmt/shared-components/loaders/loader.component';
import { BindingModule } from 'src/app/iis-mgmt/website/binding/binding.module';
import { WebsiteEditComponent } from './website-edit.component';
import { WebsiteGeneralComponent } from './website-general.component';
import { WebsiteSettingsComponent } from './website-settings.component';

@NgModule({
    imports: [
        CommonModule,
        PivotModule,
        LoaderModule,
        FormsModule,
        ReactiveFormsModule,
        FileExplorerLibModule,
        FileExplorerFormsModule,
        SmeFormsModule,
        DialogModule,
        AppPoolListModule,
        IISDialogModule,
        IISFormModule,
        BindingModule,
        IISActionsModule,
    ],
    declarations: [
        WebsiteEditComponent,
        WebsiteSettingsComponent,
        WebsiteGeneralComponent,
    ],
    exports: [
        WebsiteEditComponent,
        WebsiteGeneralComponent,
    ]
})
export class WebsiteGeneralModule { }
