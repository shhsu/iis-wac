
import { Route } from '@angular/router';
import { AuthenticationComponent } from 'src/app/iis-mgmt/configuration/authentication.component';
import { AuthorizationComponent } from 'src/app/iis-mgmt/configuration/authorization.component';
import { WebsiteIdentifierField } from 'src/app/iis-mgmt/service/website.service';
import { WebsiteListComponent } from 'src/app/iis-mgmt/shared-components/website/website-list.component';
import { websiteGeneralRoute } from './general/website-general.route';
import { WebsiteComponent } from './website.component';

export const websiteRoute: Route = {
    path: 'website',
    children: [
        {
            path: '',
            component: WebsiteListComponent,
        },
        {
            path: `:${WebsiteIdentifierField}`,
            component: WebsiteComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'general',
                },
                websiteGeneralRoute,
                {
                    path: 'authentication',
                    component: AuthenticationComponent,
                },
                {
                    path: 'authorization',
                    component: AuthorizationComponent,
                },
            ],
        },
    ],
};
