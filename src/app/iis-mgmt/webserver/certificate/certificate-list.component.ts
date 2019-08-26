import { Component, ViewChild } from '@angular/core';
import { DataTableComponent } from '@msft-sme/angular';
import { Observable } from 'rxjs';
import { Certificate } from 'src/app/iis-mgmt/models/certificate';
import { CertificateService } from 'src/app/iis-mgmt/service/data/certificates.service';
import { ListLoaderComponent } from 'src/app/iis-mgmt/shared-components/loaders/list-loader.component';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'iis-certs',
    templateUrl: './certificate-list.component.html',
})
export class CertificateListComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();
    private _contents = this.srv.getAll();

    @ViewChild('loader')
    loader: ListLoaderComponent;

    @ViewChild('dataTable')
    dataTable: DataTableComponent;

    constructor(
        private srv: CertificateService,
    ) { }

    get contents(): Observable<Certificate> {
        return this._contents;
    }

    get selected() {
        return this.dataTable.selection;
    }
}
