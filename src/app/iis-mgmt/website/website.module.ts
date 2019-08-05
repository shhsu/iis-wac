import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SettingsModule, SmeFormsModule, } from '@microsoft/windows-admin-center-sdk/angular';
import { ConfigurationsModule } from 'src/app/iis-mgmt/configuration/configuration.module';
import { Module as LoaderModule } from 'src/app/iis-mgmt/shared-components/loaders/loader.component';
import { WebSiteListModule } from 'src/app/iis-mgmt/shared-components/website/website-list.module';
import { WebsiteGeneralComponent } from './website-general.component';
import { WebsiteComponent } from './website.component';

@NgModule({
    imports: [
        CommonModule,
        ConfigurationsModule,
        SettingsModule,
        SmeFormsModule,
        WebSiteListModule,
        LoaderModule,
    ],
    declarations: [
        WebsiteComponent,
        WebsiteGeneralComponent,
    ],
    exports: [
        WebsiteComponent,
    ],
})
export class WebSiteModule {}
