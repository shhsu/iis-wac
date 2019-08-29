
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataTableModule } from '@msft-sme/angular';
import { IISActionsModule } from 'src/app/iis-mgmt/shared-components/actions/iis-actions.module';
import { IISDialogModule } from 'src/app/iis-mgmt/shared-components/dialog/iis-dialog.module';
import { LoadersModule } from 'src/app/iis-mgmt/shared-components/loaders/loaders.module';
import { StatusModule } from 'src/app/iis-mgmt/shared-components/status/status.component';
import { WebsiteGeneralModule } from 'src/app/iis-mgmt/website/general/website-general.module';
import { WebsiteListComponent } from './website-list.component';

@NgModule({
    imports: [
        CommonModule,
        DataTableModule,
        StatusModule,
        LoadersModule,
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
