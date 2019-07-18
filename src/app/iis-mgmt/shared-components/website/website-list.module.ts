
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActionsModule, DataTableModule, LoadingWheelModule, } from '@microsoft/windows-admin-center-sdk/angular';
import { Module as AppPoolAnnotationModule } from '../app-pool/app-pool-annotation.component';
import { StatusModule } from '../status/status.component';
import { WebsiteListComponent } from './website-list.component';

@NgModule({
    imports: [
        ActionsModule,
        CommonModule,
        DataTableModule,
        LoadingWheelModule,
        StatusModule,
        AppPoolAnnotationModule,
    ],
    declarations: [
        WebsiteListComponent,
    ],
    exports: [
        WebsiteListComponent,
    ],
})
export class WebSiteListModule {}
