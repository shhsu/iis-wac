
import { ActivatedRoute } from '@angular/router';
import { WebSite } from 'src/app/iis-mgmt/models/website';
import { WebSiteService } from 'src/app/iis-mgmt/service/website.service';
import { SettingTabComponent } from 'src/app/iis-mgmt/shared-components/settings/setting-tab.component';
import { WebsiteComponent } from './website.component';

export abstract class WebsiteSettingComponent extends SettingTabComponent<WebSite> {
    constructor(
        route: ActivatedRoute,
        srv: WebSiteService,
    ) {
        super(WebsiteComponent, route, srv);
    }

    get website() {
        return this.item;
    }
}
