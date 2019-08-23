
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule, PivotModule, SmeFormsModule } from '@msft-sme/angular';
import { IISActionsModule } from 'src/app/iis-mgmt/shared-components/actions/iis-actions.module';
import { Module as LoaderModule } from 'src/app/iis-mgmt/shared-components/loaders/loader.component';
import { AppPoolEditComponent } from './app-pool-edit.component';
import { AppPoolGeneralComponent } from './app-pool-general.component';

@NgModule({
    imports: [
        CommonModule,
        PivotModule,
        LoaderModule,
        FormsModule,
        ReactiveFormsModule,
        SmeFormsModule,
        DialogModule,
        IISActionsModule,
    ],
    declarations: [
        AppPoolEditComponent,
        AppPoolGeneralComponent,
    ],
    exports: [
        AppPoolEditComponent,
        AppPoolGeneralComponent,
    ]
})
export class AppPoolGeneralModule {
}
