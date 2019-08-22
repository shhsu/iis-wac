import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';
import { CommonSetting, getModules } from 'src/app/iis-mgmt/shared-components/settings/settings-item';

const webServerSettings = getModules(
  CommonSetting.VirtualDirectory,
  CommonSetting.Authentication,
  CommonSetting.Authorization,
  CommonSetting.Certificate,
  CommonSetting.CertStore,
  CommonSetting.DefaultDoc,
  CommonSetting.DirBrowsing,
  CommonSetting.IpRestriction,
  CommonSetting.Logging,
  CommonSetting.MimeMap,
  CommonSetting.Monitoring,
  CommonSetting.Module,
  CommonSetting.Compression,
  CommonSetting.RequestFiltering,
  CommonSetting.Header,
  CommonSetting.Tracing,
  CommonSetting.StaticContent,
  CommonSetting.UrlRewrite,
);

@Component({
  selector: 'iis-webserver',
  templateUrl: './webserver.component.html'
})
export class WebserverComponent {
  public readonly items = webServerSettings;
  public static navigationTitle(_: AppContextService, __: ActivatedRouteSnapshot): string {
    return 'webserver';
  }
}
