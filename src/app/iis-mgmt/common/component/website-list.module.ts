
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActionsModule, DataTableModule, LoadingWheelModule, } from '@microsoft/windows-admin-center-sdk/angular';
import { WebsiteListComponent } from './website-list.component';

@NgModule({
    imports: [
        ActionsModule,
        CommonModule,
        DataTableModule,
        LoadingWheelModule,
    ],
    declarations: [
        WebsiteListComponent,
    ],
    exports: [
        WebsiteListComponent,
    ],
})
export class WebSiteListModule {}
