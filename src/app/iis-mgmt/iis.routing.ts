import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IISComponent } from './iis.component';
import { WebserverComponent } from './webserver/webserver.component';
import { routes as WebServerRoutes } from './webserver/webserver.module';
import { websiteRoute } from './website/website.route';

const routes: Routes = [
{
    path: '',
    component: IISComponent,
    children: [
        websiteRoute,
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
