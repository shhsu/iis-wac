
import { msftSmeStrings } from 'src/app/iis-mgmt/common/constants';
import { ChangeDetection, deepEqualNaive, fromCSObject, } from 'src/app/iis-mgmt/common/util/serialization';
import { extractStatus, Status } from './status';

// NOTE: make sure custom is always last!!
export enum Protocol {
    // NOTE: actually inetmgr supports ftp, not sure why we drop it here
    HTTP,
    HTTPS,
    Custom,
}

export const protocolNames = [
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

export function isHttp(value: string) {
    return value === protocolNames[Protocol.HTTP] || value === protocolNames[Protocol.HTTPS];
}

export class Limits {
    constructor(
        public connectionTimeout: number = null,
        public maxBandwidth: number = null,
        public maxConnections: number = null,
        public maxUrlSegments: number = null,
    ) { }

    public static transform(limits: any): Limits {
        const result = fromCSObject(Limits, limits);
        const attributes: any[] = limits.Schema.AttributeSchemas;
        if (!attributes.filter(e => e.Name === 'maxUrlSegments')) {
            result.maxUrlSegments = null;
        }
        return result;
    }
}

export class RequestTracing {
    constructor(
        public enabled: boolean = null,
        public directory: string = null,
        public maxLogFiles: number = null,
    ) { }
}

// https://docs.microsoft.com/en-us/dotnet/api/microsoft.web.administration.sslflags?view=iis-dotnet
export enum SslFlags {
    None = 0,
    Sni = 1,
    CentralCertStore = 2,
}

// https://docs.microsoft.com/en-us/dotnet/api/system.net.sockets.addressfamily?view=netframework-4.8
export enum AddressFamily {
    Unknown = -1,
    Unspecified = 0,
    Unix = 1,
    InterNetwork = 2,
    ImpLink = 3,
    Pup = 4,
    Chaos = 5,
    Ipx = 6,
    NS = 6,
    Iso = 7,
    Osi = 7,
    Ecma = 8,
    DataKit = 9,
    Ccitt = 10,
    Sna = 11,
    DecNet = 12,
    DataLink = 13,
    Lat = 14,
    HyperChannel = 15,
    AppleTalk = 16,
    NetBios = 17,
    VoiceView = 18,
    FireFox = 19,
    Banyan = 21,
    Atm = 22,
    InterNetworkV6 = 23,
    Cluster = 24,
    Ieee12844 = 25,
    Irda = 26,
    NetworkDesigners = 28,
    Max = 29,
    Packet = 65536,
    ControllerAreaNetwork = 65537,
}

const addressAll = '0.0.0.0';
export class IPEndPoint {
    constructor(
        public port: number = null,
        public address: string = addressAll,
        public addressFamily: AddressFamily = AddressFamily.InterNetwork,
    ) { }

    get addressFriendly() {
        if (this.address === addressAll) {
            return '';
        }
    }
}

export class Binding implements ChangeDetection<Binding> {
    constructor(
        public bindingInformation: string = null,
        public certificateHash: Int8Array = null,
        public certificateStoreName: string = null,
        public endPoint: IPEndPoint = null,
        public host: string = null,
        public isIPPortHostBinding: boolean = false,
        public protocol: string = null,
        public sslFlags: SslFlags = SslFlags.None,
        public useDsMapper: boolean = false,
    ) { }

    public static transform(obj: any): Binding {
        const result = fromCSObject(Binding, obj);
        result.endPoint = fromCSObject(IPEndPoint, obj.EndPoint);
        if (result.protocol) {
            result.protocol = result.protocol.toUpperCase();
        }
        return result;
    }

    // NOTE: the following functions only compare fields we used
    // if we add feature to binding creation we would need to update
    // these methods
    isSameAs(other: Binding): boolean {
        if (this.protocol !== other.protocol) {
            return false;
        }
        switch (this.protocol) {
            case protocolNames[Protocol.HTTP]:
                return this.isHttpSame(other);
            case protocolNames[Protocol.HTTPS]:
                return this.isHttpSame(other) && this.isHttpsSame(other);
            default:
                return this.isCustomBindingSame(other);
        }
    }

    private isCustomBindingSame(other: Binding): boolean {
        return this.protocol === other.protocol && this.bindingInformation === other.bindingInformation;
    }

    private isHttpSame(other: Binding): boolean {
        return this.host === other.host && deepEqualNaive(this.endPoint, other.endPoint);
    }

    private isHttpsSame(other: Binding): boolean {
        return this.sslFlags === other.sslFlags &&
            deepEqualNaive(this.certificateHash, other.certificateHash) &&
            this.certificateStoreName === other.certificateStoreName;
    }
}

function selectByPath(items: any[], path: string) {
    if (!items) {
        return null;
    }
    const filtered = items.filter(item => item.Path === path);
    if (filtered.length === 0) {
        return null;
    }
    return filtered[0];
}

export class Website {
    constructor(
        public name: string = null,
        public physicalPath: string = null,
        public status: Status = null,
        public serverAutoStart: boolean = null,
        public enabledProtocols: string = null,
        public limits: Limits = null,
        public traceFailedRequestsLogging: RequestTracing = null,
        public bindings: Binding[] = null,
        public applicationPoolName: string = null,
    ) { }

    public static transform(site: any): Website {
        const result = fromCSObject(Website, site);
        const rootApp = selectByPath(site.Applications, '/');
        if (rootApp) {
            const vDir = selectByPath(rootApp.VirtualDirectories, '/');
            if (vDir) {
                result.physicalPath = vDir.PhysicalPath;
            }
            result.enabledProtocols = rootApp.EnabledProtocols;
            result.applicationPoolName = rootApp.ApplicationPoolName;
        }
        result.status = extractStatus(site);
        result.limits = Limits.transform(site.Limits);
        if (site.Bindings) {
            result.bindings = site.Bindings.map(b => Binding.transform(b));
        }
        if (site.TraceFailedRequestsLogging) {
            result.traceFailedRequestsLogging = fromCSObject(RequestTracing, site.TraceFailedRequestsLogging);
        }
        return result;
    }
}
