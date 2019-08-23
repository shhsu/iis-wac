
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataTableModule } from '@msft-sme/angular';
import { IISActionsModule } from 'src/app/iis-mgmt/shared-components/actions/iis-actions.module';
import { IISDialogModule } from 'src/app/iis-mgmt/shared-components/dialog/iis-dialog.module';
import { Module as ListsModule } from 'src/app/iis-mgmt/shared-components/loaders/list-loader.component';
import { StatusModule } from 'src/app/iis-mgmt/shared-components/status/status.component';
import { WebsiteGeneralModule } from 'src/app/iis-mgmt/website/general/website-general.module';
import { WebsiteListComponent } from './website-list.component';

@NgModule({
    imports: [
        CommonModule,
        DataTableModule,
        StatusModule,
        ListsModule,
        IISDialogModule,
        IISActionsModule,
        WebsiteGeneralModule,
        IISActionsModule,
    ],
    declarations: [
        WebsiteListComponent,
    ],
    exports: [
        WebsiteListComponent,
    ],
})
export class WebSiteListModule { }
