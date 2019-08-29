
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataTableModule } from '@msft-sme/angular';
import { LoadersModule } from 'src/app/iis-mgmt/shared-components/loaders/loaders.module';
import { IISStylesModule } from 'src/app/iis-mgmt/shared-components/styles/styles.module';
import { CertificationAnnotationComponent } from './certificate-annotation.component';
import { CertificateListComponent } from './certificate-list.component';

@NgModule({
    imports: [
        CommonModule,
        DataTableModule,
        LoadersModule,
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
