import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';
import { CommonSetting, getModules } from 'src/app/iis-mgmt/shared-components/settings/settings-item';

export const appPoolSettings = getModules(
    CommonSetting.Website,
    CommonSetting.WebApp,
);

@Component({
    templateUrl: './app-pool.component.html',
})
export class AppPoolComponent {
    public readonly items = appPoolSettings;
    public static navigationTitle(_: AppContextService, __: ActivatedRouteSnapshot): string {
        return 'app-pool';
    }
}
