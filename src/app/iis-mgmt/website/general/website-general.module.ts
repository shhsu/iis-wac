
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionsModule, DialogModule, PivotModule, SmeFormsModule } from '@msft-sme/angular';
import { FileExplorerLibModule } from '@msft-sme/file-explorer';
import { FileExplorerFormsModule } from '@msft-sme/file-explorer/dist/app/file-explorer/form-fields/file-explorer-forms.module';
import { BindingsModule } from 'src/app/iis-mgmt/shared-components/binding/binding-list';
import { Module as LoaderModule } from 'src/app/iis-mgmt/shared-components/loaders/loader.component';
import { WebsiteEditComponent } from './website-edit.component';
import { WebsiteGeneralComponent } from './website-general.component';
import { WebsiteSettingsComponent } from './website-settings.component';

@NgModule({
    imports: [
        CommonModule,
        PivotModule,
        LoaderModule,
        ActionsModule,
        BindingsModule,
        FormsModule,
        ReactiveFormsModule,
        FileExplorerLibModule,
        FileExplorerFormsModule,
        SmeFormsModule,
        DialogModule,
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
export class WebsiteGeneralModule {}
