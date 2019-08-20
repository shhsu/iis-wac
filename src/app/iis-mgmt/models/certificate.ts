import { msftSmeStrings } from 'src/app/iis-mgmt/common/constants';

export class Certificate {
    location: string;
    friendlyName: string;
    issuer: string;
    subject: string;
    thumbprint: string;
    signatureAlgorithm: string;
    notAfter: Date;
    notBefore: Date;
    version: number;
    intendedPurposes: Array<string>;
    subjectAlternativeNames: Array<string>;

    get displayName() {
        return this.friendlyName || this.subject || this.thumbprint || msftSmeStrings.MsftIISWAC.cert.unnamed;
    }
}
