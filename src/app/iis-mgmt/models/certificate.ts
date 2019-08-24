import { msftSmeStrings } from 'src/app/iis-mgmt/common/constants';
import { fromCSDate, fromCSObject } from 'src/app/iis-mgmt/common/util/serialization';

export class Certificate {
    location: string = null;
    friendlyName: string = null;
    issuer: string = null;
    subject: string = null;
    thumbprint: string = null;
    signatureAlgorithm: string = null;
    notAfter: Date = null;
    notBefore: Date = null;
    version: number = null;
    intendedPurposes: string[] = null;
    subjectAlternativeNames: string[] = null;

    public static transform(obj: any) {
        const result = fromCSObject(Certificate, obj);
        result.notAfter = fromCSDate(obj.NotAfter);
        result.notBefore = fromCSDate(obj.notBefore);
        return result;
    }

    get displayName() {
        return this.friendlyName || this.subject || this.thumbprint || msftSmeStrings.MsftIISWAC.cert.unnamed;
    }
}
