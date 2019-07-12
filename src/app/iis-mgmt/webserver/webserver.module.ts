import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SettingsModule, SmeFormsModule } from '@microsoft/windows-admin-center-sdk/angular';
import { WebserverGeneralComponent } from './webserver-general.component';
import { WebserverComponent } from './webserver.component';

export const routes: Routes = [
    {
        path: 'general',
        component: WebserverGeneralComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        SettingsModule,
        SmeFormsModule,
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
