import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SettingsModule, SmeFormsModule, } from '@msft-sme/angular';
import { LoadersModule } from 'src/app/iis-mgmt/shared-components/loaders/loaders.module';
import { AppPoolComponent } from './app-pool.component';
import { AppPoolGeneralModule } from './general/app-pool-general.module';
import { AppPoolListModule } from './list/app-pool-list.module';

@NgModule({
    imports: [
        CommonModule,
        SettingsModule,
        SmeFormsModule,
        LoadersModule,
        AppPoolListModule,
        AppPoolGeneralModule,
    ],
    declarations: [
        AppPoolComponent,
    ],
    exports: [
        AppPoolComponent,
    ],
})
export class AppPoolModule { }
