import { msftSmeStrings } from 'src/app/iis-mgmt/common/constants';

let objectStates: string[];

export function extractStatus(obj: any): Status {
    if (obj.State == null) {
        return Status.Unknown;
    } else {
        return obj.State;
    }
}

export function printStatus(state: Status): string {
    if (!objectStates) {
        // enum order refers to https://docs.microsoft.com/en-us/dotnet/api/microsoft.web.administration.objectstate?view=iis-dotnet
        objectStates = [
            msftSmeStrings.MsftIISWAC.status.starting,
            msftSmeStrings.MsftIISWAC.status.started,
            msftSmeStrings.MsftIISWAC.status.stopping,
            msftSmeStrings.MsftIISWAC.status.stopped,
            msftSmeStrings.MsftIISWAC.status.unknown,
        ];
    }
    return objectStates[state];
}

export enum Status {
    Starting,
    Started,
    Stopping,
    Stopped,
    Unknown,
}
