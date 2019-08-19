
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionsModule, DialogModule, PivotModule, SmeFormsModule } from '@msft-sme/angular';
import { BindingsModule } from 'src/app/iis-mgmt/shared-components/binding/binding-list';
import { Module as LoaderModule } from 'src/app/iis-mgmt/shared-components/loaders/loader.component';
import { AppPoolEditComponent } from './app-pool-edit.component';
import { AppPoolGeneralComponent } from './app-pool-general.component';

@NgModule({
    imports: [
        CommonModule,
        PivotModule,
        LoaderModule,
        ActionsModule,
        BindingsModule,
        FormsModule,
        ReactiveFormsModule,
        SmeFormsModule,
        DialogModule,
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
