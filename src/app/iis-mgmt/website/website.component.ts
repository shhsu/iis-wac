import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';
import { WebsiteIdentifierField } from 'src/app/iis-mgmt/service/website.service';
import { CommonSetting, getModules } from 'src/app/iis-mgmt/shared-components/settings/settings-item';

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
  templateUrl: './website.component.html'
})
export class WebsiteComponent {
  public static readonly keyName = WebsiteIdentifierField;
  public readonly items = websiteSettings;
  public static navigationTitle(_: AppContextService, __: ActivatedRouteSnapshot): string {
    return 'website';
  }
}
