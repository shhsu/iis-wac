import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';
import { WebSiteService } from 'src/app/iis-mgmt/service/website.service';
import { WebsiteSettingComponent } from './website-setting.component';

@Component({
  selector: 'iis-website-general',
  templateUrl: './website-general.component.html',
  styleUrls: ['./website-general.component.css']
})
export class WebsiteGeneralComponent extends WebsiteSettingComponent {

  public static navigationTitle(_: AppContextService, __: ActivatedRouteSnapshot): string {
    return 'general';
  }

  constructor(
    route: ActivatedRoute,
    srv: WebSiteService,
  ) {
    super(route, srv);
  }
}
