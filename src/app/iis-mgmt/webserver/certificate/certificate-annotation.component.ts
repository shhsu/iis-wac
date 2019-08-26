import { Component, Input, OnInit } from '@angular/core';
import { formatF } from 'src/app/iis-mgmt/common/util/string-utils';
import { Certificate } from 'src/app/iis-mgmt/models/certificate';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'iis-cert',
    template: `
<span [iis-attention]="error">{{value.displayName}}</span>
`,
})
export class CertificationAnnotationComponent implements OnInit {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    value: Certificate;
    error: string;

    ngOnInit(): void {
        const now = new Date();
        if (now > this.value.notAfter) {
            this.error = formatF(this.strings.MsftIISWAC.cert.certificateExpired,
                this.value.displayName, this.value.notAfter.toLocaleDateString());
            return;
        }
        if (now < this.value.notBefore) {
            this.error = formatF(this.strings.MsftIISWAC.cert.certificateNotReady,
                this.value.displayName, this.value.notAfter.toLocaleDateString());
        }
    }
}
