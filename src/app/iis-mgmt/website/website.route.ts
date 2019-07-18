
import { Route } from '@angular/router';
import { WebsiteListComponent } from 'src/app/iis-mgmt/shared-components/website/website-list.component';
import { WebsiteGeneralComponent } from './website-general.component';
import { WebsiteComponent } from './website.component';

export const websiteRoute: Route = {
    path: 'website',
    children: [
        {
            path: '',
            component: WebsiteListComponent,
        },
        {
            path: ':id',
            component: WebsiteComponent,
            children: [
                {
                    path: 'general',
                    component: WebsiteGeneralComponent,
                },
            ],
        },
    ],
};
