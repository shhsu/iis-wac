import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { msftSmeStrings } from 'src/app/iis-mgmt/common/constants';
import { bitwiseGet, bitwiseSet } from 'src/app/iis-mgmt/common/util/serialization';
import { Certificate } from 'src/app/iis-mgmt/models/certificate';
import { Binding, getDefaultProtocolValue, Protocol, protocolNames, SslFlags } from 'src/app/iis-mgmt/models/website';
import { CertificateService } from 'src/app/iis-mgmt/service/data/certificates.service';
import { LoaderComponent } from 'src/app/iis-mgmt/shared-components/loaders/loader.component';
import { CertificateListComponent } from 'src/app/iis-mgmt/webserver/certificate/certificate-list.component';



@Component({
    selector: 'iis-binding',
    templateUrl: './binding.component.html',
})
export class BindingComponent implements OnInit {
    public readonly strings = msftSmeStrings;
    public readonly protocolsType = Protocol;
    public readonly protocolNames = protocolNames;
    private _protocolType: Protocol;

    @Input()
    binding: Binding;

    @ViewChild('certSelect')
    certSelect: CertificateListComponent;

    @ViewChild('certLoader')
    certLoader: LoaderComponent;

    certContent: Observable<Certificate>;

    constructor(
        private certSrv: CertificateService,
    ) { }

    ngOnInit(): void {
        const defaultValue = getDefaultProtocolValue(this.binding.protocol);
        if (defaultValue !== null) {
            this._protocolType = defaultValue;
        } else {
            this._protocolType = Protocol.Custom;
        }
        if (this.showCertInfo) {
            this.updateCertContentObservable(this.binding);
        }
    }

    updateCertContentObservable(b: Binding) {
        // eagerly evaluate certificate
        this.certContent = this.certSrv.getFromBinding(b).pipe(
            shareReplay(1),
        );
    }

    get showCertInfo() {
        return this._protocolType === Protocol.HTTPS;
    }

    get isCustomSelected() {
        return this._protocolType === Protocol.Custom;
    }

    get protocolType(): Protocol {
        return this._protocolType;
    }

    set protocolType(value: Protocol) {
        if (value !== Protocol.Custom) {
            this.binding.protocol = protocolNames[value];
        }
        if (value === Protocol.HTTPS && (!this.binding.certificateHash)) {
            this.certContent = of(null);
        }
        this._protocolType = value;
        // TODO: add logic to validate if custom is selected, actual protocol cannot be "http", or "https" case insensitive
    }

    get requireSNI(): boolean {
        return bitwiseGet(this.binding.sslFlags, SslFlags.Sni);
    }

    set requireSNI(value: boolean) {
        this.binding.sslFlags = bitwiseSet(this.binding.sslFlags, value, SslFlags.Sni);
    }

    get getCertSelection() {
        if (this.certLoader && this.certLoader.item) {
            const cert = <Certificate>this.certLoader.item;
            return ['thumbprint', cert.thumbprint];
        }
        return null;
    }

    get certDisplayName() {
        if (this.certLoader && this.certLoader.item) {
            return this.certLoader.item.displayName;
        }
        return null;
    }

    selectCert() {
        this.binding.certificateHash = this.certSelect.selected.hash;
        this.binding.certificateStoreName = this.certSelect.selected.location;
        // set this in case the view needs to be reloaded
        this.updateCertContentObservable(this.binding);
        // No need to reload, setting item directly to trigger view update
        this.certLoader.item = this.certSelect.selected;
    }
}
