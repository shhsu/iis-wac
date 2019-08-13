import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ActionsModule, SettingsModule, SmeFormsModule } from '@msft-sme/angular';
import { AuthenticationComponent } from 'src/app/iis-mgmt/configuration/authentication.component';
import { AuthorizationComponent } from 'src/app/iis-mgmt/configuration/authorization.component';
import { ConfigurationsModule } from 'src/app/iis-mgmt/configuration/configuration.module';
import { NotImplementedComponent } from 'src/app/iis-mgmt/configuration/not-implemented.component';
import { Module as LoaderModule } from 'src/app/iis-mgmt/shared-components/loaders/loader.component';
import { WebserverGeneralComponent } from './webserver-general.component';
import { WebserverComponent } from './webserver.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'general',
    },
    {
        path: 'general',
        component: WebserverGeneralComponent,
    },
    {
        path: 'vidr',
        component: NotImplementedComponent,
    },
    {
        path: 'authentication',
        component: AuthenticationComponent,
    },
    {
        path: 'authorization',
        component: AuthorizationComponent,
    },
];

@NgModule({
    imports: [
        ActionsModule,
        CommonModule,
        SettingsModule,
        SmeFormsModule,
        ConfigurationsModule,
        LoaderModule,
    ],
    declarations: [
        WebserverComponent,
        WebserverGeneralComponent,
    ],
    exports: [
        WebserverComponent,
        WebserverGeneralComponent,
    ],
})
export class WebServerModule {}
