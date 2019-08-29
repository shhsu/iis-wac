import { msftSmeStrings } from 'src/app/iis-mgmt/common/constants';
import { fromCSDate, fromCSObject } from 'src/app/iis-mgmt/common/util/serialization';

export class Certificate {
    constructor(
        public location: string = null,
        public friendlyName: string = null,
        public issuer: string = null,
        public subject: string = null,
        public thumbprint: string = null,
        public hash: Int8Array = null,
        public signatureAlgorithm: string = null,
        public notAfter: Date = null,
        public notBefore: Date = null,
        public version: number = null,
        public intendedPurposes: string[] = null,
        public subjectAlternativeNames: string[] = null,
    ) { }

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
