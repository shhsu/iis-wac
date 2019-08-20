import { Component, Input, OnInit } from '@angular/core';
import { Strings } from 'src/generated/strings';
import { ApplicationPool } from '../../models/app-pool';
import { Website } from '../../models/website';

@Component({
    selector: 'iis-website-settings',
    templateUrl: 'website-settings.component.html',
})
export class WebsiteSettingsComponent {
  public readonly strings = MsftSme.resourcesStrings<Strings>();
  @Input()
  site: Website = <Website> {
    name: this.strings.MsftIISWAC.website.newName,
  };

  get appPoolDialogHeader() {
    return `${this.strings.MsftIISWAC.website.selectAppPoolDialogHeader} ${this.site.name}`;
  }

  setAppPool(pool: ApplicationPool) {
    this.site.applicationPoolName = pool.name;
  }
}
