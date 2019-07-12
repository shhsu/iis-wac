import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdleComponent } from '@microsoft/windows-admin-center-sdk/angular';

// These are the basic routes that are required in order to load an extension and make service calls.
const appRoutes: Routes = [
    // The idle component route is used for 'long running' processes that take any amount of time (async).
    // This is a required path and component.
    {
        path: 'idle',
        component: IdleComponent
    },
    {
        path: '',
        loadChildren: './iis-mgmt/iis.module#IISModule'
    },
    // this child route is used to route back to the home path when an invalid URL is provided to the browser.
    {
        path: '**',
        redirectTo: ''  // double check navigation
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                // un-comment to enable debug log messages
                enableTracing: false,

                // don't navigate at initially.
                initialNavigation: false,
            })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
