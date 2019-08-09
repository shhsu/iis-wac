import { Route } from '@angular/router';
import { WebsiteGeneralComponent } from './website-general.component';

export const websiteGeneralRoute: Route = {
    path: 'general',
    children: [
        {
            path: '',
            component: WebsiteGeneralComponent,
        },
    ],
};
