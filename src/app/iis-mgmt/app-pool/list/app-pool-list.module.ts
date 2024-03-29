
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataTableModule } from '@msft-sme/angular';
import { AppPoolGeneralModule } from 'src/app/iis-mgmt/app-pool/general/app-pool-general.module';
import { IISActionsModule } from 'src/app/iis-mgmt/shared-components/actions/iis-actions.module';
import { IISDialogModule } from 'src/app/iis-mgmt/shared-components/dialog/iis-dialog.module';
import { LoadersModule } from 'src/app/iis-mgmt/shared-components/loaders/loaders.module';
import { StatusModule } from 'src/app/iis-mgmt/shared-components/status/status.component';
import { AppPoolListComponent } from './app-pool-list.component';
import { IdentityComponent } from './identity.component';

@NgModule({
    imports: [
        CommonModule,
        DataTableModule,
        StatusModule,
        LoadersModule,
        IISDialogModule,
        AppPoolGeneralModule,
        IISActionsModule,
    ],
    declarations: [
        AppPoolListComponent,
        IdentityComponent,
    ],
    exports: [
        AppPoolListComponent,
    ],
})
export class AppPoolListModule { }
