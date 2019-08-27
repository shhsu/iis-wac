import { CommonSettingsNavigationItem } from '@msft-sme/angular';
import { IISStrings, msftSmeStrings } from 'src/app/iis-mgmt/common/constants';

export enum CommonSetting {
    Website,
    WebApp,
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

const icons = IISStrings.icons;

export const commonSettings = new Map<CommonSetting, CommonSettingsNavigationItem>([
    [CommonSetting.Website, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.common.websites,
        routeParams: {
            commands: [
                'website',
            ],
        },
        smeIconClassName: icons.website,
    }],
    [CommonSetting.WebApp, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.common.webApplications,
        routeParams: {
            commands: [
                'web-app',
            ],
        },
        smeIconClassName: icons.webApp,
    }],
    [CommonSetting.VirtualDirectory, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.virtualDirectory,
        routeParams: {
            commands: [
                'vdir',
            ],
        },
        smeIconClassName: icons.vdir,
    }],
    [CommonSetting.Authentication, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.authentication,
        routeParams: {
            commands: [
                'authentication',
            ],
        },
        smeIconClassName: icons.authentication,
    }],
    [CommonSetting.Authorization, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.authorization,
        routeParams: {
            commands: [
                'authorization',
            ],
        },
        smeIconClassName: icons.authorization,
    }],
    [CommonSetting.Certificate, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.certificate,
        routeParams: {
            commands: [
                'certificate',
            ],
        },
        smeIconClassName: icons.cert,
    }],
    [CommonSetting.CertStore, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.certStore,
        routeParams: {
            commands: [
                'cert-store',
            ],
        },
        smeIconClassName: icons.certStore,
    }],
    [CommonSetting.DefaultDoc, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.defaultDoc,
        routeParams: {
            commands: [
                'default-doc',
            ],
        },
        smeIconClassName: icons.defaultDoc,
    }],
    [CommonSetting.DirBrowsing, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.dirBrowsing,
        routeParams: {
            commands: [
                'dir-browsing',
            ],
        },
        smeIconClassName: icons.dirBrowsing,
    }],
    [CommonSetting.Files, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.files,
        routeParams: {
            commands: [
                'files',
            ],
        },
        smeIconClassName: icons.files,
    }],
    [CommonSetting.IpRestriction, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.ipRestriction,
        routeParams: {
            commands: [
                'ip-restriction',
            ],
        },
        smeIconClassName: icons.ipRestriction,
    }],
    [CommonSetting.Logging, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.logging,
        routeParams: {
            commands: [
                'logging',
            ],
        },
        smeIconClassName: icons.logging,
    }],
    [CommonSetting.MimeMap, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.mimeMap,
        routeParams: {
            commands: [
                'mime-map',
            ],
        },
        smeIconClassName: icons.mimeMap,
    }],
    [CommonSetting.Monitoring, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.monitoring,
        routeParams: {
            commands: [
                'monitoring',
            ],
        },
        smeIconClassName: icons.monitoring,
    }],
    [CommonSetting.Module, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.module,
        routeParams: {
            commands: [
                'module',
            ],
        },
        smeIconClassName: icons.module,
    }],
    [CommonSetting.Compression, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.compression,
        routeParams: {
            commands: [
                'compression',
            ],
        },
        smeIconClassName: icons.compression,
    }],
    [CommonSetting.RequestFiltering, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.requestFiltering,
        routeParams: {
            commands: [
                'request-filtering',
            ],
        },
        smeIconClassName: icons.requestFilter,
    }],
    [CommonSetting.Header, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.header,
        routeParams: {
            commands: [
                'header',
            ],
        },
        smeIconClassName: icons.header,
    }],
    [CommonSetting.Tracing, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.tracing,
        routeParams: {
            commands: [
                'tracing',
            ],
        },
        smeIconClassName: icons.tracing,
    }],
    [CommonSetting.StaticContent, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.staticContent,
        routeParams: {
            commands: [
                'static-content',
            ],
        },
        smeIconClassName: icons.staticContent,
    }],
    [CommonSetting.UrlRewrite, <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.urlRewrite,
        routeParams: {
            commands: [
                'url-rewrite',
            ],
        },
        smeIconClassName: icons.urlRewrite,
    }],
]);

export function getModules(
    ...includes: CommonSetting[]
): CommonSettingsNavigationItem[] {
    const generalTab = <CommonSettingsNavigationItem>{
        label: msftSmeStrings.MsftIISWAC.tabs.general,
        routeParams: { commands: ['general'] },
        smeIconClassName: icons.general,
    };
    return [generalTab].concat(
        includes.map(key => commonSettings.get(key)).sort((a, b) => a.label.localeCompare(b.label))
    );
}
