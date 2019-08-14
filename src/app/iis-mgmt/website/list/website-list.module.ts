
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActionsModule, DataTableModule } from '@msft-sme/angular';
import { Module as AppPoolAnnotationModule } from 'src/app/iis-mgmt/app-pool/app-pool-annotation.component';
import { IISDialogModule } from 'src/app/iis-mgmt/shared-components/dialog/iis-dialog.module';
import { Module as ListsModule } from 'src/app/iis-mgmt/shared-components/loaders/list-loader.component';
import { StatusModule } from 'src/app/iis-mgmt/shared-components/status/status.component';
import { WebsiteGeneralModule } from 'src/app/iis-mgmt/website/general/website-general.module';
import { WebsiteListComponent } from './website-list.component';

@NgModule({
    imports: [
        ActionsModule,
        CommonModule,
        DataTableModule,
        StatusModule,
        AppPoolAnnotationModule,
        ListsModule,
        IISDialogModule,
        WebsiteGeneralModule,
    ],
    declarations: [
        WebsiteListComponent,
    ],
    exports: [
        WebsiteListComponent,
    ],
})
export class WebSiteListModule {}
