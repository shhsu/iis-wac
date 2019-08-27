import { Component, Input } from '@angular/core';
import { ProcessModel, ProcessModelIdentityType } from 'src/app/iis-mgmt/models/app-pool';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'identity',
    template: `{{display}}`,
})
export class IdentityComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();
    @Input()
    model: ProcessModel;

    get display() {
        switch (this.model.identityType) {
            case ProcessModelIdentityType.LocalSystem:
                return this.strings.MsftIISWAC.appPool.pipeline;
            case ProcessModelIdentityType.LocalService:
                return this.strings.MsftIISWAC.appPool.identity.localService;
            case ProcessModelIdentityType.NetworkService:
                return this.strings.MsftIISWAC.appPool.identity.networkService;
            case ProcessModelIdentityType.ApplicationPoolIdentity:
                return this.strings.MsftIISWAC.appPool.identity.appPoolIdentity;
            case ProcessModelIdentityType.SpecificUser:
                return this.model.userName;
        }
        return this.strings.MsftIISWAC.common.notAvailableShort;
    }
}
