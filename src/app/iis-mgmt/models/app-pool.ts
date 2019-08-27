

import { msftSmeStrings } from 'src/app/iis-mgmt/common/constants';
import { fromCSDate, fromCSObject } from 'src/app/iis-mgmt/common/util/serialization';
import { extractStatus, Status } from './status';

// https://docs.microsoft.com/en-us/dotnet/api/microsoft.web.administration.managedpipelinemode?view=iis-dotnet
export enum PipelineMode {
    Integrated = 0,
    Classic = 1,
}

export const PipelineModeFriendlyNames = [
    msftSmeStrings.MsftIISWAC.appPool.pipeline.integrated,
    msftSmeStrings.MsftIISWAC.appPool.pipeline.classic,
];

// https://docs.microsoft.com/en-us/dotnet/api/microsoft.web.administration.processoraction?view=iis-dotnet
export enum ProcessorAction {
    NoAction = 0,
    KillW3wp = 1,
    Throttle = 2,
    ThrottleUnderLoad = 3,
}

export class Cpu {
    limit: number;
    resetInterval: number;
    action: ProcessorAction;
    processorAffinityEnabled: boolean;
    processorAffinityMask32: string;
    processorAffinityMask64: string;

    public static transform(cpu: any): Cpu {
        const result = fromCSObject(Cpu, cpu);
        result.processorAffinityEnabled = cpu.SmpAffinitized;
        result.processorAffinityMask32 = `0x${cpu.SmpProcessorAffinityMask.toString(16)}`;
        result.processorAffinityMask64 = `0x${cpu.SmpProcessorAffinityMask2.toString(16)}`;
        return result;
    }
}

// https://docs.microsoft.com/en-us/dotnet/api/microsoft.web.administration.idletimeoutaction?view=iis-dotnet
export enum IdleTimeoutAction {
    Terminate = 0,
    Suspend = 1,
}

export class ProcessModel {
    constructor(
        public idleTimeout: number = null,
        public idleTimeoutAction: IdleTimeoutAction = null,
        public maxProcesses: number = null,
        public pingingEnabled: boolean = null,
        public pingInterval: number = null,
        public pingResponseTime: number = null,
        public shutdownTimeLimit: number = null,
        public startupTimeLimit: number = null,
        public identityType = ProcessModelIdentityType.ApplicationPoolIdentity,
        public userName: string = null,
        public password: string = null,
        public loadUserProfile: boolean = null,
    ) { }

    public static transform(model: any): ProcessModel {
        const result = fromCSObject(ProcessModel, model);
        result.idleTimeout = model.IdleTimeout.TotalMinutes;
        result.pingInterval = model.PingInterval.TotalSeconds;
        result.pingResponseTime = model.PingResponseTime.TotalSeconds;
        result.shutdownTimeLimit = model.ShutdownTimeLimit.TotalSeconds;
        result.startupTimeLimit = model.StartupTimeLimit.TotalSeconds;
        return result;
    }
}

// https://docs.microsoft.com/en-us/dotnet/api/microsoft.web.administration.processmodelidentitytype?view=iis-dotnet
export enum ProcessModelIdentityType {
    LocalSystem = 0,
    LocalService = 1,
    NetworkService = 2,
    SpecificUser = 3,
    ApplicationPoolIdentity = 4,
}

export const ProcessModelIdentityTypeNames = [
    msftSmeStrings.MsftIISWAC.appPool.identity.localSystem,
    msftSmeStrings.MsftIISWAC.appPool.identity.localService,
    msftSmeStrings.MsftIISWAC.appPool.identity.networkService,
    msftSmeStrings.MsftIISWAC.appPool.identity.specificUser,
    msftSmeStrings.MsftIISWAC.appPool.identity.appPoolIdentity,
];

// https://docs.microsoft.com/en-us/dotnet/api/microsoft.web.administration.processmodelidentitytype?view=iis-dotnet
export enum RecyclingLogEventOnRecycle {
    None = 0,
    Time = 1,
    Requests = 2,
    Schedule = 4,
    Memory = 8,
    IsapiUnhealthy = 16,
    OnDemand = 32,
    ConfigChange = 64,
    PrivateMemory = 128,
}

export class ApplicationPoolPeriodicRestart {
    constructor(
        public time: number = null,
        public privateMemory: number = null,
        public requests: number = null,
        public memory: number = null,
        public schedule: Date[] = [],
    ) { }

    public static transform(obj: any): ApplicationPoolPeriodicRestart {
        const result = fromCSObject(ApplicationPoolPeriodicRestart, obj);
        result.time = obj.Time.TotalMinutes;
        for (const s of obj.Schedule) {
            s.push(fromCSDate(s.Time));
        }
        return result;
    }
}

export class Recycling {
    constructor(
        public disallowRotationOnConfigChange: boolean = null,
        public disallowOverlappingRotation: boolean = null,
        public logEventOnRecycle: RecyclingLogEventOnRecycle = null,
        public periodicRestart: ApplicationPoolPeriodicRestart = null,
    ) { }

    public static transform(obj: any): Recycling {
        const result = fromCSObject(Recycling, obj);
        result.periodicRestart = ApplicationPoolPeriodicRestart.transform(obj.PeriodicRestart);
        return result;
    }
}

// https://docs.microsoft.com/en-us/dotnet/api/microsoft.web.administration.loadbalancercapabilities?view=iis-dotnet
export enum LoadBalancerCapabilities {
    TcpLevel = 1,
    HttpLevel = 2,
}

export class RapidFailProtection {
    constructor(
        public loadBalancerCapabilities: LoadBalancerCapabilities = null,
        public interval: number = null,
        public rapidFailProtectionMaxCrashes: number = null,
        public autoShutdownExe: string = null,
        public autoShutdownParams: string = null,
        public orphanWorkerProcess: boolean = null,
        public orphanActionExe: string = null,
        public orphanActionParams: string = null,
    ) { }

    public static transform(obj: any): RapidFailProtection {
        const result = fromCSObject(RapidFailProtection, obj);
        result.interval = obj.RapidFailProtectionInterval.TotalMinutes;
        return result;
    }
}

export class ApplicationPool {
    constructor(
        public name: string = null,
        public status: Status = null,
        public autoStart: boolean = null,
        public managedPipelineMode: PipelineMode = null,
        public managedRuntimeVersion: string = null,
        public enable32BitAppOnWin64: boolean = null,
        public queueLength: number = null,
        public cpu: Cpu = null,
        public processModel: ProcessModel = null,
        public recycling: Recycling = null,
        public failure: RapidFailProtection = null,
    ) { }

    public static transform(pool: any): ApplicationPool {
        const result = fromCSObject(ApplicationPool, pool);
        result.status = extractStatus(pool);
        result.cpu = Cpu.transform(pool.Cpu);
        result.processModel = ProcessModel.transform(pool.ProcessModel);
        result.recycling = Recycling.transform(pool.Recycling);
        if (pool.Failure) {
            result.failure = RapidFailProtection.transform(pool.Failure);
        }
        return result;
    }

    public pipelineModeFriendly() {
        return PipelineModeFriendlyNames[this.managedPipelineMode];
    }

    public runtimeVersionFriendly() {
        switch (this.managedRuntimeVersion) {
            case 'v2.0':
                return msftSmeStrings.MsftIISWAC.appPool.managed.runtime.v35;
            case 'v4.0':
                return msftSmeStrings.MsftIISWAC.appPool.managed.runtime.v4x;
            case '':
                return msftSmeStrings.MsftIISWAC.appPool.managed.runtime.none;
            default:
                return this.managedRuntimeVersion;
        }
    }
}
