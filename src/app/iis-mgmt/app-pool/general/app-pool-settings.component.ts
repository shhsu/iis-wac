import { Component, Input, OnInit } from '@angular/core';
import { ApplicationPool, ProcessModelIdentityType, ProcessModelIdentityTypeNames } from 'src/app/iis-mgmt/models/app-pool';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'iis-app-pool-settings',
    templateUrl: './app-pool-settings.component.html',
})
export class AppPoolSettingsComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();
    friendlyIdentityTypeOrder = [
        ProcessModelIdentityType.ApplicationPoolIdentity,
        ProcessModelIdentityType.NetworkService,
        ProcessModelIdentityType.LocalService,
        ProcessModelIdentityType.LocalSystem,
        ProcessModelIdentityType.SpecificUser,
    ];
    identityTypeNames = ProcessModelIdentityTypeNames;

    @Input()
    pool: ApplicationPool;
}
