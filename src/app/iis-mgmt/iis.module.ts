import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PivotModule, SettingsModule, SmeFormsModule, SplitViewModule } from '@msft-sme/angular';
import { AppPoolModule } from './app-pool/app-pool.module';
import { IISComponent } from './iis.component';
import { Routing } from './iis.routing';
import { AppPoolService } from './service/data/app-pool.service';
import { CertificateService } from './service/data/certificates.service';
import { PowershellService } from './service/data/powershell.service';
import { WebServerService } from './service/data/webserver.service';
import { WebSiteService } from './service/data/website.service';
import { RouteDeactivationGuard } from './service/ui/route-deactivation-guard';
import { RouteDeactivationService } from './service/ui/route-deactivation.service';
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
    CertificateService,
    WebServerService,
    AppPoolService,
    WebSiteService,
    RouteDeactivationService,
    RouteDeactivationGuard,
  ]
})
export class IISModule { }
