import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SettingsModule, SmeFormsModule, } from '@msft-sme/angular';
import { ConfigurationsModule } from 'src/app/iis-mgmt/configuration/configuration.module';
import { LoadersModule } from 'src/app/iis-mgmt/shared-components/loaders/loaders.module';
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
        LoadersModule,
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
