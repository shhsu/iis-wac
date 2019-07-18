import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';
import { CommonSetting, getModules } from 'src/app/iis-mgmt/shared-components/settings/settings-item';
import { SettingsComponent } from 'src/app/iis-mgmt/shared-components/settings/settings.component';

export const websiteSettings = getModules(
  CommonSetting.VirtualDirectory,
  CommonSetting.Authentication,
  CommonSetting.Authorization,
  CommonSetting.DefaultDoc,
  CommonSetting.DirBrowsing,
  CommonSetting.IpRestriction,
  CommonSetting.Logging,
  CommonSetting.MimeMap,
  CommonSetting.Module,
  CommonSetting.Compression,
  CommonSetting.RequestFiltering,
  CommonSetting.Header,
  CommonSetting.Tracing,
  CommonSetting.StaticContent,
  CommonSetting.UrlRewrite,
);

@Component({
  selector: 'iis-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent extends SettingsComponent {
  public static navigationTitle(_: AppContextService, __: ActivatedRouteSnapshot): string {
    return 'website';
  }

  constructor(
    route: ActivatedRoute,
    router: Router,
  ) {
    super(WebsiteComponent, route, router, websiteSettings);
  }
}
