import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';
import { Strings } from 'src/generated/strings';
import { Website } from '../../models/website';

@Component({
    selector: 'website-settings',
    templateUrl: 'website-settings.component.html',
})
export class WebsiteSettingsComponent implements OnInit {
    public readonly strings = MsftSme.resourcesStrings<Strings>();
    @Input()
    site: Website;
    siteName: string;
    physicalPath: string[];
    autoStart: boolean;

    public static navigationTitle(_: AppContextService, __: ActivatedRouteSnapshot): string {
      return 'settings';
    }

    ngOnInit() {
        this.siteName = this.site.name;
        this.physicalPath = [ this.site.physicalPath ];
    }
}
