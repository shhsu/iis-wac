import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appPoolRoute } from './app-pool/app-pool.route';
import { IISComponent } from './iis.component';
import { WebserverComponent } from './webserver/webserver.component';
import { routes as WebServerRoutes } from './webserver/webserver.module';
import { websiteRoute } from './website/website.route';

const routes: Routes = [
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

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class Routing { }
