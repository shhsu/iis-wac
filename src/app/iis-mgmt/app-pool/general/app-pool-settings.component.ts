import { Component, Input, OnInit } from '@angular/core';
import { ApplicationPool, ProcessModelIdentityType, ProcessModelIdentityTypeNames } from 'src/app/iis-mgmt/models/app-pool';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'iis-app-pool-settings',
    templateUrl: './app-pool-settings.component.html',
})
export class AppPoolSettingsComponent implements OnInit {
    public readonly strings = MsftSme.resourcesStrings<Strings>();
    friendlyIdentityTypeOrder = [
        ProcessModelIdentityType.ApplicationPoolIdentity,
        ProcessModelIdentityType.NetworkService,
        ProcessModelIdentityType.LocalService,
        ProcessModelIdentityType.LocalSystem,
        ProcessModelIdentityType.SpecificUser,
    ];
    identityType: ProcessModelIdentityType;
    identityTypeNames = ProcessModelIdentityTypeNames;

    @Input()
    pool: ApplicationPool;

    ngOnInit(): void {
        if (this.pool.identity) {
            this.identityType = this.pool.identity.identityType;
        } else {
            this.identityType = ProcessModelIdentityType.ApplicationPoolIdentity;
        }
    }
}
