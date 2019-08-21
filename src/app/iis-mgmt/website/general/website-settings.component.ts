import { Component, Input, ViewChild } from '@angular/core';
import { AppPoolListComponent } from 'src/app/iis-mgmt/app-pool/list/app-pool-list.component';
import { formatF } from 'src/app/iis-mgmt/common/util/string-utils';
import { Website } from 'src/app/iis-mgmt/models/website';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'iis-website-settings',
    templateUrl: './website-settings.component.html',
})
export class WebsiteSettingsComponent {
  public readonly strings = MsftSme.resourcesStrings<Strings>();
  @Input()
  site: Website = <Website> {
    name: this.strings.MsftIISWAC.website.newName,
  };

  @ViewChild('appPoolSelect')
  pools: AppPoolListComponent;

  get appPoolDialogHeader() {
    return formatF(this.strings.MsftIISWAC.website.selectAppPoolDialogHeader, this.site.name);
  }

  selectAppPool() {
    this.site.applicationPoolName = this.pools.selected.name;
  }
}
