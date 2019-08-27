import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';
import { Strings } from 'src/generated/strings';
import { IISStrings } from './common/constants';
import { PowershellService } from './service/data/powershell.service';

function formatTabIcon(icon: string) {
    return `sme-icon sme-margin-right-xs ${icon}`;
}

@Component({
    selector: 'iis-component',
    templateUrl: './iis.component.html'
})
export class IISComponent implements OnInit {
    public readonly strings = MsftSme.resourcesStrings<Strings>();
    public static navigationTitle(
        _: AppContextService,
        __: ActivatedRouteSnapshot,
    ): string {
        return 'IIS';
    }

    constructor(
        private ps: PowershellService,
    ) {
    }

    public ngOnInit() {
        this.ps.createSession();
    }

    get webserverIcon() {
        return formatTabIcon(IISStrings.icons.webserver);
    }

    get websiteIcon() {
        return formatTabIcon(IISStrings.icons.website);
    }

    get appPoolIcon() {
        return formatTabIcon(IISStrings.icons.appPool);
    }
}
