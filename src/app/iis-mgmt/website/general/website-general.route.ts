import { Route } from '@angular/router';
import { CanDeactivateGuard } from '@msft-sme/angular';
import { WebsiteGeneralComponent } from './website-general.component';

export const websiteGeneralRoute: Route = {
    path: 'general',
    children: [
        {
            path: '',
            component: WebsiteGeneralComponent,
            canDeactivate: [CanDeactivateGuard],
        },
    ],
};
