import { fromCSObject } from '../common/util/serialization';
import { Status } from './status';

// System.ServiceProcess.ServiceControllerStatus
enum ServiceControllerStatus {
    Stopped = 1,
    StartPending = 2,
    StopPending = 3,
    Running = 4,
    ContinuePending = 5,
    PausePending = 6,
    Paused = 7
}

function toIISStatus(svcStatus: ServiceControllerStatus) {
    switch (svcStatus) {
        case ServiceControllerStatus.StopPending:
        case ServiceControllerStatus.PausePending:
            return Status.Stopping;
        case ServiceControllerStatus.Stopped:
        case ServiceControllerStatus.Paused:
            return Status.Stopped;
        case ServiceControllerStatus.StartPending:
        case ServiceControllerStatus.ContinuePending:
            return Status.Starting;
        case ServiceControllerStatus.Running:
            return Status.Started;
        default:
            return Status.Unknown;
    }
}

export class WebServer {
    // id: string;
    name: string = null;
    status: Status = null;
    supportsSNI: boolean = null;
    version: string = null;
    // _links: any;
    public static aggregate(ws: any): WebServer {
        const result = fromCSObject(WebServer, ws);
        console.warn(ws.Status);
        result.status = toIISStatus(ws.Status);
        return result;
    }
}
