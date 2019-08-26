import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appPoolRoute } from './app-pool/app-pool.route';
import { IISComponent } from './iis.component';
import { RouteDeactivationGuard } from './service/ui/route-deactivation-guard';
import { WebserverComponent } from './webserver/webserver.component';
import { routes as WebServerRoutes } from './webserver/webserver.module';
import { websiteRoute } from './website/website.route';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'webserver',
    },
    {
        path: '',
        component: IISComponent,
        children: [
            websiteRoute,
            appPoolRoute,
            {
                path: 'webserver',
                component: WebserverComponent,
                children: WebServerRoutes,
            }
        ],
    }
];

// function calls are not supported, modify the routes in a code block
const routeStack = [routes];
while (routeStack.length > 0) {
    const thisRoutes = routeStack.pop();
    for (const route of thisRoutes) {
        if (route.component) {
            route.canDeactivate = [RouteDeactivationGuard];
        }
        if (route.children) {
            routeStack.push(route.children);
        }
    }
}

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class Routing { }
