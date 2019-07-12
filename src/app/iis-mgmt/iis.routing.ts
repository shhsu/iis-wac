import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteListComponent } from './common/component/website-list.component';
import { IISComponent } from './iis.component';
import { WebserverComponent } from './webserver/webserver.component';
import { routes as WebServerRoutes } from './webserver/webserver.module';
import { WebsiteComponent } from './website/website.component';

const routes: Routes = [
{
    path: '',
    component: IISComponent,
    children: [
        {
            path: 'website-list',
            component: WebsiteListComponent,
        },
        {
            path: 'website',
            component: WebsiteComponent,
        },
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
