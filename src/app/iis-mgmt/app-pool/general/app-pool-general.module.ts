
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule, PivotModule, SmeFormsModule } from '@msft-sme/angular';
import { IISActionsModule } from 'src/app/iis-mgmt/shared-components/actions/iis-actions.module';
import { IISDropdownModule } from 'src/app/iis-mgmt/shared-components/dropdown/iis-dropdown.module';
import { IISFormModule } from 'src/app/iis-mgmt/shared-components/form/iis-form.module';
import { LoadersModule } from 'src/app/iis-mgmt/shared-components/loaders/loaders.module';
import { AppPoolEditComponent } from './app-pool-edit.component';
import { AppPoolGeneralComponent } from './app-pool-general.component';
import { AppPoolSettingsComponent } from './app-pool-settings.component';

@NgModule({
    imports: [
        CommonModule,
        PivotModule,
        LoadersModule,
        FormsModule,
        ReactiveFormsModule,
        SmeFormsModule,
        DialogModule,
        IISActionsModule,
        IISFormModule,
        IISDropdownModule,
    ],
    declarations: [
        AppPoolSettingsComponent,
        AppPoolEditComponent,
        AppPoolGeneralComponent,
    ],
    exports: [
        AppPoolSettingsComponent,
        AppPoolEditComponent,
        AppPoolGeneralComponent,
    ]
})
export class AppPoolGeneralModule {
}
