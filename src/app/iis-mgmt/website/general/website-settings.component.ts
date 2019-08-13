import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';
import { Strings } from 'src/generated/strings';
import { Website } from '../../models/website';

@Component({
    selector: 'website-settings',
    templateUrl: 'website-settings.component.html',
})
export class WebsiteSettingsComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();
    @Input()
    site: Website;

    public static navigationTitle(_: AppContextService, __: ActivatedRouteSnapshot): string {
      return 'settings';
    }
}
