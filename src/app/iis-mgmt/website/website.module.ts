import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SettingsModule, SmeFormsModule } from '@microsoft/windows-admin-center-sdk/angular';
import { WebsiteComponent } from './website.component';

export const routes: Routes = [
];

@NgModule({
    imports: [
        CommonModule,
        SettingsModule,
        SmeFormsModule,
    ],
    declarations: [
        WebsiteComponent,
    ],
    exports: [
        WebsiteComponent,
    ],
})
export class WebSiteModule {}
