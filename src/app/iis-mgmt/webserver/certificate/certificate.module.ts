
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataTableModule } from '@msft-sme/angular';
import { Module as ListsModule } from 'src/app/iis-mgmt/shared-components/loaders/list-loader.component';
import { IISStylesModule } from 'src/app/iis-mgmt/shared-components/styles/styles.module';
import { CertificationAnnotationComponent } from './certificate-annotation.component';
import { CertificateListComponent } from './certificate-list.component';

@NgModule({
    imports: [
        CommonModule,
        DataTableModule,
        ListsModule,
        IISStylesModule,
    ],
    declarations: [
        CertificateListComponent,
        CertificationAnnotationComponent,
    ],
    exports: [
        CertificateListComponent,
        CertificationAnnotationComponent,
    ],
})
export class CertificateModule { }
