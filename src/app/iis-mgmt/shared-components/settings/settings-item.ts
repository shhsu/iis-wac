import { CommonSettingsNavigationItem } from '@msft-sme/angular';
import { Strings } from 'src/generated/strings';

export enum CommonSetting {
    VirtualDirectory,
    Authentication,
    Authorization,
    Certificate,
    CertStore,
    DefaultDoc,
    DirBrowsing,
    Files,
    IpRestriction,
    Logging,
    MimeMap,
    Monitoring,
    Module,
    Compression,
    RequestFiltering,
    Header,
    Tracing,
    StaticContent,
    UrlRewrite,
}

export const commonSettings = new Map<CommonSetting, CommonSettingsNavigationItem>([
    [CommonSetting.VirtualDirectory, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.virtualDirectory,
        routeParams: {
            commands: [
                'vdir',
            ],
        },
        smeIconClassName: 'sme-icon-folder',
    }],
    [CommonSetting.Authentication, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.authentication,
        routeParams: {
            commands: [
                'authentication',
            ],
        },
        smeIconClassName: 'sme-icon-localAdmin',
    }],
    [CommonSetting.Authorization, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.authorization,
        routeParams: {
            commands: [
                'authorization',
            ],
        },
        smeIconClassName: 'sme-icon-group',
    }],
    [CommonSetting.Certificate, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.certificate,
        routeParams: {
            commands: [
                'certificate',
            ],
        },
        smeIconClassName: 'sme-icon-lock',
    }],
    [CommonSetting.CertStore, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.certStore,
        routeParams: {
            commands: [
                'cert-store',
            ],
        },
        smeIconClassName: 'sme-icon-certificateManager',
    }],
    [CommonSetting.DefaultDoc, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.defaultDoc,
        routeParams: {
            commands: [
                'default-doc',
            ],
        },
        smeIconClassName: 'sme-icon-openFile',
    }],
    [CommonSetting.DirBrowsing, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.dirBrowsing,
        routeParams: {
            commands: [
                'dir-browsing',
            ],
        },
        smeIconClassName: 'sme-icon-openFolderHorizontal',
    }],
    [CommonSetting.Files, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.files,
        routeParams: {
            commands: [
                'files',
            ],
        },
        smeIconClassName: 'sme-icon-hardDrive',
    }],
    [CommonSetting.IpRestriction, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.ipRestriction,
        routeParams: {
            commands: [
                'ip-restriction',
            ],
        },
        smeIconClassName: 'sme-icon-blocked2',
    }],
    [CommonSetting.Logging, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.logging,
        routeParams: {
            commands: [
                'logging',
            ],
        },
        smeIconClassName: 'sme-icon-edit',
    }],
    [CommonSetting.MimeMap, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.mimeMap,
        routeParams: {
            commands: [
                'mime-map',
            ],
        },
        smeIconClassName: 'sme-icon-virtualNetwork',
    }],
    [CommonSetting.Monitoring, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.monitoring,
        routeParams: {
            commands: [
                'monitoring',
            ],
        },
        smeIconClassName: 'sme-icon-sDNMonitoring',
    }],
    [CommonSetting.Module, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.module,
        routeParams: {
            commands: [
                'module',
            ],
        },
        smeIconClassName: 'sme-icon-tripleColumn',
    }],
    [CommonSetting.Compression, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.compression,
        routeParams: {
            commands: [
                'compression',
            ],
        },
        smeIconClassName: 'sme-icon-unzipFolder',
    }],
    [CommonSetting.RequestFiltering, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.requestFiltering,
        routeParams: {
            commands: [
                'request-filtering',
            ],
        },
        smeIconClassName: 'sme-icon-filter',
    }],
    [CommonSetting.Header, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.header,
        routeParams: {
            commands: [
                'header',
            ],
        },
        smeIconClassName: 'sme-icon-down',
    }],
    [CommonSetting.Tracing, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.tracing,
        routeParams: {
            commands: [
                'tracing',
            ],
        },
        smeIconClassName: 'sme-icon-networkPipes',
    }],
    [CommonSetting.StaticContent, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.staticContent,
        routeParams: {
            commands: [
                'static-content',
            ],
        },
        smeIconClassName: 'sme-icon-fileExplorer',
    }],
    [CommonSetting.UrlRewrite, <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.urlRewrite,
        routeParams: {
            commands: [
                'url-rewrite',
            ],
        },
        smeIconClassName: 'sme-icon-switch',
    }],
]);

export function getModules(...includes: CommonSetting[]): CommonSettingsNavigationItem[] {
    const generalTab = <CommonSettingsNavigationItem> {
        label: MsftSme.resourcesStrings<Strings>().MsftIISWAC.tabs.general,
        routeParams: { commands: ['general'] },
        smeIconClassName: 'sme-icon-serverProcesses',
    };
    return [generalTab].concat(
        includes.map(key => commonSettings.get(key)).sort((a, b) => a.label.localeCompare(b.label))
    );
}
