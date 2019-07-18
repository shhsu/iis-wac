import { Strings } from 'src/generated/strings';

const strings = MsftSme.resourcesStrings<Strings>();
// enum order refers to https://docs.microsoft.com/en-us/dotnet/api/microsoft.web.administration.objectstate?view=iis-dotnet
const objectStates = [
    strings.MsftIISWAC.status.starting,
    strings.MsftIISWAC.status.started,
    strings.MsftIISWAC.status.stopping,
    strings.MsftIISWAC.status.stopped,
    strings.MsftIISWAC.status.unknown,
];

export function extractStatus(obj: any): Status {
    if (obj.State == null) {
        return Status.Unknown;
    } else {
        return obj.State;
    }
}

export function printStatus(state: Status): string {
    return objectStates[state];
}

export enum Status {
    Starting,
    Started,
    Stopping,
    Stopped,
    Unknown,
}
