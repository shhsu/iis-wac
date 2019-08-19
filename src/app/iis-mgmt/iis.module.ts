import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PivotModule, SettingsModule, SmeFormsModule, SplitViewModule } from '@msft-sme/angular';
import { AppPoolModule } from './app-pool/app-pool.module';
import { IISComponent } from './iis.component';
import { Routing } from './iis.routing';
import { AppPoolService } from './service/app-pool.service';
import { PowershellService } from './service/powershell.service';
import { WebServerService } from './service/webserver.service';
import { WebSiteService } from './service/website.service';
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
    AppPoolModule,
    WebSiteModule,
  ],
  declarations: [
    IISComponent,
  ],
  providers: [
    PowershellService,
    WebServerService,
    AppPoolService,
    WebSiteService,
  ]
})
export class IISModule { }
