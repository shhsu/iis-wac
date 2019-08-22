import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Certificate } from 'src/app/iis-mgmt/models/certificate';
import { CertificateService } from 'src/app/iis-mgmt/service/certificates.service';
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

    constructor(
        private srv: CertificateService,
    ) { }

    get contents(): Observable<Certificate> {
        return this._contents;
    }

    get selected(): Certificate {
        if (this.loader) {
            return this.loader.selected;
        }
    }

    set selected(cert: Certificate) {
        if (this.loader) {
            this.loader.selected = cert;
        }
    }
}
