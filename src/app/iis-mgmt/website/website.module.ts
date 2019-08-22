import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SettingsModule, SmeFormsModule, } from '@msft-sme/angular';
import { ConfigurationsModule } from 'src/app/iis-mgmt/configuration/configuration.module';
import { Module as LoaderModule } from 'src/app/iis-mgmt/shared-components/loaders/loader.component';
import { WebsiteGeneralModule } from './general/website-general.module';
import { WebSiteListModule } from './list/website-list.module';
import { WebsiteComponent } from './website.component';

@NgModule({
    imports: [
        CommonModule,
        ConfigurationsModule,
        SettingsModule,
        SmeFormsModule,
        WebSiteListModule,
        LoaderModule,
        WebsiteGeneralModule,
    ],
    declarations: [
        WebsiteComponent,
    ],
    exports: [
        WebsiteComponent,
    ],
})
export class WebSiteModule { }
