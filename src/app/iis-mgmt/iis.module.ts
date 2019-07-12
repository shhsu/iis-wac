import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PivotModule, SettingsModule, SmeFormsModule, SplitViewModule } from '@microsoft/windows-admin-center-sdk/angular';
import { WebSiteListModule } from './common/component/website-list.module';
import { PowershellService } from './common/service/powershell.service';
import { IISComponent } from './iis.component';
import { Routing } from './iis.routing';
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
  ]
})
export class IISModule { }
