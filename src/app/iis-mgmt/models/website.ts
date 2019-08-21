
import { fromCSObject } from 'src/app/iis-mgmt/common/util/serialization';
import { Certificate } from './certificate';
import { extractStatus, Status } from './status';

export class Limits {
    constructor(
        public connectionTimeout: number = null,
        public maxBandwidth: number = null,
        public maxConnections: number = null,
        public maxUrlSegments: number = null,
    ) {}

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
    ) {}
}

export class Binding {
    constructor(
        public ipAddress: string = null,
        public port: number = null,
        public hostname: string = null,
        public requireSni: boolean = null,
        public isHttps: boolean = null,
        public protocol: string = null,
        public bindingInformation: boolean = null,
        public certificate: Certificate = null,     // TODO:
        public isNew: boolean = null,
    ) {}

    public static transform(binding: any): Binding {
        const result = fromCSObject(Binding, binding);
        const bindingName = binding.Protocol.toLowerCase();
        if (bindingName === 'http' || bindingName === 'https') {
            const endpoint = binding.EndPoint;
            if (endpoint) {
                result.port = endpoint.Port;
                const address = endpoint.Address;
                if (address) {
                    result.ipAddress = address.IPAddressToString;
                }
            }
        }

        result.hostname = binding.Host;

        if (bindingName === 'https') {
//     if (binding.Protocol.Equals("https")) {
//         ICertificateStore store = null;

//         // Windows store
//         if (binding.CertificateStoreName != null) {
//             string thumbprint = binding.CertificateHash == null ? null
//              : BitConverter.ToString(binding.CertificateHash)?.Replace("-", string.Empty);
//             store = CertificateStoreProviderAccessor.Instance?.Stores
//                         .FirstOrDefault(s => s.Name.Equals(binding.CertificateStoreName, StringComparison.OrdinalIgnoreCase));

//             // Certificate
//             if (store != null) {
//                 obj.certificate = CertificateHelper.ToJsonModelRef(GetCertificate(() => store.GetCertificate(thumbprint).Result));
//             }
//         }

//         // IIS Central Certificate Store
//         else if (binding.Schema.HasAttribute(sslFlagsAttribute)
//              && binding.SslFlags.HasFlag(SslFlags.CentralCertStore) && !string.IsNullOrEmpty(binding.Host)) {
//             ICentralCertificateStore centralStore = null;

//             if (PathUtil.IsValidFileName(binding.Host)) {
//                 centralStore = CertificateStoreProviderAccessor.Instance?.Stores
//                      .FirstOrDefault(s => s is ICentralCertificateStore) as ICentralCertificateStore;
//             }

//             // Certificate
//             if (centralStore != null) {
//                 obj.certificate = CertificateHelper.ToJsonModelRef(
//                  GetCertificate(() => centralStore.GetCertificateByHostName(binding.Host.Replace('*', '_')).Result));
//             }
//         }

//         //
//         // Ssl Flags
//         if (binding.Schema.HasAttribute(sslFlagsAttribute)) {
//             obj.require_sni = binding.SslFlags.HasFlag(SslFlags.Sni);
//         }
//     }
        }
        return result;
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
        public id: number = null,
        public physicalPath: string = null,
        public key: number = null,
        public status: Status = null,
        public serverAutoStart: boolean = null,
        public enabledProtocols: string = null,
        public limits: Limits = null,
        public traceFailedRequestsLogging: RequestTracing = null,
        public bindings: Binding[] = null,
        public applicationPoolName: string = null,
    ) {}

    public static transform(site: any): Website {
        const result = fromCSObject(Website, site);
        // TODO: site.id encode/decode?
        const rootApp = selectByPath(site.Applications, '/');
        if (rootApp) {
            const vDir = selectByPath(rootApp.VirtualDirectories, '/');
            if (vDir) {
                result.physicalPath = vDir.PhysicalPath;
            }
            result.enabledProtocols = rootApp.EnabledProtocols;
            result.applicationPoolName = rootApp.ApplicationPoolName;
        }
        result.key = site.Id;
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
