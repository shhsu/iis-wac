import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PivotModule, SettingsModule, SmeFormsModule, SplitViewModule } from '@microsoft/windows-admin-center-sdk/angular';
import { IISComponent } from './iis.component';
import { Routing } from './iis.routing';
import { PowershellService } from './service/powershell.service';
import { WebSiteService } from './service/website.service';
import { WebSiteListModule } from './shared-components/website/website-list.module';
import { WebServerModule } from './webserver/webserver.module';
import { WebSiteModule } from './website/website.module';

@NgModule({
  imports: [
    PivotModule,
    CommonModule,
    SplitViewModule,
    Routing,
    SettingsModule,
    SmeFormsModule,
    WebServerModule,
    WebSiteModule,
    WebSiteListModule,
  ],
  declarations: [
    IISComponent,
  ],
  providers: [
    PowershellService,
    WebSiteService,
  ]
})
export class IISModule { }
