import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { msftSmeStrings } from 'src/app/iis-mgmt/common/constants';
import { bitwiseGet, bitwiseSet } from 'src/app/iis-mgmt/common/util/serialization';
import { Binding, SslFlags } from 'src/app/iis-mgmt/models/website';
import { CertificateListComponent } from 'src/app/iis-mgmt/webserver/certificate/certificate-list.component';

// NOTE: make sure custom is always last!!
export enum Protocol {
    // NOTE: actually inetmgr supports ftp, not sure why we drop it here
    HTTP,
    HTTPS,
    Custom,
}

const protocolNames = [
    'HTTP',
    'HTTPS',
    msftSmeStrings.MsftIISWAC.website.binding.custom,
];

export function getDefaultProtocolValue(value: string): Protocol {
    for (let i = 0; i < protocolNames.length - 1; i++) {
        if (value === protocolNames[i]) {
            return i;
        }
    }
    return null;
}

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

    ngOnInit(): void {
        const bindingString = this.binding.protocol.toUpperCase();
        const defaultValue = getDefaultProtocolValue(bindingString);
        if (defaultValue !== null) {
            this._protocolType = defaultValue;
        } else {
            this._protocolType = Protocol.Custom;
        }
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
        this._protocolType = value;
        // TODO: add logic to validate if custom is selected, actual protocol cannot be "http", or "https" case insensitive
    }

    get requireSNI(): boolean {
        return bitwiseGet(this.binding.sslFlags, SslFlags.Sni);
    }

    set requireSNI(value: boolean) {
        this.binding.sslFlags = bitwiseSet(this.binding.sslFlags, value, SslFlags.Sni);
    }

    get certificateName() {
        if (this.binding.certificate) {
            return this.binding.certificate.displayName;
        }
    }

    get getCertSelection() {
        if (this.binding.certificate) {
            return ['thumbprint', this.binding.certificate.thumbprint];
        }
        return null;
    }

    selectCert() {
        this.binding.certificate = this.certSelect.selected;
    }
}
