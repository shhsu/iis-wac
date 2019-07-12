import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService, CommonSettingsNavigationItem } from '@microsoft/windows-admin-center-sdk/angular';
import { WACComponent } from 'src/app/iis-mgmt/common/component/wac-component';

// @dynamic
@Component({
  selector: 'iis-webserver',
  templateUrl: './webserver.component.html',
  styleUrls: ['./webserver.component.css']
})
export class WebserverComponent extends WACComponent implements OnInit {
  public settingItems: CommonSettingsNavigationItem[] = [];

  public static navigationTitle(_: AppContextService, __: ActivatedRouteSnapshot): string {
    return 'webserver';
  }

  constructor(
    // route: ActivatedRoute,
  ) {
    super();
    this.settingItems.push(
      {
        label: this.strings.MsftIISWAC.generalTabTitle,
        routeParams: {
          commands: [
            '/webserver/general',
            // {
            //   relativeTo: route
            // }
          ],
        },
        smeIconClassName: 'sme-icon-windowsAdminCenterIIS',
      },
      {
        label: 'delete me',
        routeParams: {
          commands: [
            '../empty',
          ],
        },
        smeIconClassName: 'sme-icon-windowsAdminCenterIIS',
      },
    );
  }

  ngOnInit() {
  }
}
