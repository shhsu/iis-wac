import { Route } from '@angular/router';
import { AppPoolIdentifierField } from 'src/app/iis-mgmt/service/app-pool.service';
import { AppPoolComponent } from './app-pool.component';
import { AppPoolGeneralComponent } from './general/app-pool-general.component';
import { AppPoolListComponent } from './list/app-pool-list.component';

export const appPoolRoute: Route = {
    path: 'app-pool',
    children: [
        {
            path: '',
            component: AppPoolListComponent,
        },
        {
            path: `:${AppPoolIdentifierField}`,
            component: AppPoolComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'general',
                },
                {
                    path: 'general',
                    component: AppPoolGeneralComponent,
                },
                // {
                //     path: 'authentication',
                //     component: AuthenticationComponent,
                // },
                // {
                //     path: 'authorization',
                //     component: AuthorizationComponent,
                // },
            ],
        },
    ],
};
