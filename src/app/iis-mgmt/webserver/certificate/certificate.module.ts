
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataTableModule } from '@msft-sme/angular';
import { Module as ListsModule } from 'src/app/iis-mgmt/shared-components/loaders/list-loader.component';
import { CertificateListComponent } from './certificate-list.component';

@NgModule({
    imports: [
        CommonModule,
        DataTableModule,
        ListsModule,
    ],
    declarations: [
        CertificateListComponent,
    ],
    exports: [
        CertificateListComponent,
    ],
})
export class CertificateListModule {}
