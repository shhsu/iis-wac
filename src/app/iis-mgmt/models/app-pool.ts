
import { fromCSObject } from 'src/app/iis-mgmt/common/util/serialization';
import { extractStatus, Status } from './status';

export type PipelineMode = 'integrated' | 'classic';
export const PipelineMode = {
    Integrated: 'integrated' as PipelineMode,
    Classic: 'classic' as PipelineMode,
};

export type ProcessorAction = 'KillW3wp' | 'NoAction' | 'Throttle' | 'ThrottleUnderLoad';
export const ProcessorAction = {
    KillW3wp: 'KillW3wp' as ProcessorAction,
    NoAction: 'NoAction' as ProcessorAction,
    Throttle: 'Throttle' as ProcessorAction,
    ThrottleUnderLoad: 'ThrottleUnderLoad' as ProcessorAction,
};

export class Cpu {
    limit: number;
    resetInterval: number;
    action: ProcessorAction;
    processorAffinityEnabled: boolean;
    processorAffinityMask32: string;
    processorAffinityMask64: string;

    public static transform(cpu: any): Cpu {
        const result =  fromCSObject(Cpu, cpu);
        result.processorAffinityEnabled = cpu.SmpAffinitized;
        result.processorAffinityMask32 = `0x${cpu.SmpProcessorAffinityMask.toString(16)}`;
        result.processorAffinityMask64 = `0x${cpu.SmpProcessorAffinityMask2.toString(16)}`;
        return result;
    }
}

// TODO: does this work?
export enum IdleTimeoutAction {
    Terminate,
    Suspend,
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
    ) {}

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

export class ApplicationPool {
    constructor(
        public name: string = null,
        public id: string = null,
        public status: Status = null,
        public autoStart: boolean = null,
        public managedPipelineMode: PipelineMode = null,
        public managedRuntimeVersion: string = null,
        public enable32BitAppOnWin64: boolean = null,
        public queueLength: number = null,
        public cpu: Cpu = null,
        public processModel: ProcessModel = null,
    ) {}
    // identity: ApplicationPoolIdentity;
    // recycling: Recycling;
    // rapid_fail_protection: RapidFailProtection;
    // process_orphaning: ProcessOrphaning;

    public static transform(pool: any): ApplicationPool {
        const result = fromCSObject(ApplicationPool, pool);
        // result.id = encode name
        result.status = extractStatus(pool);
        result.cpu = Cpu.transform(pool.Cpu);
        result.processModel = ProcessModel.transform(pool.ProcessModel);
        return result;
    }
}



// export class ApplicationPoolIdentity {
//     identity_type: ProcessModelIdentityType;
//     username: string;
//     password: string;
//     load_user_profile: boolean;
// }

// export class Recycling {
//     disable_overlapped_recycle: boolean;
//     disable_recycle_on_config_change: boolean;
//     log_events: {
//         time: boolean;
//         requests: boolean;
//         schedule: boolean;
//         memory: boolean;
//         isapi_unhealthy: boolean;
//         on_demand: boolean;
//         config_change: boolean;
//         private_memory: boolean;
//     };
//     periodic_restart: {
//         time_interval: number;
//         private_memory: number;
//         request_limit: number;
//         virtual_memory: number;
//         schedule: Array<string>;
//     };
// }

// export class RapidFailProtection {
//     enabled: boolean;
//     load_balancer_capabilities: LoadBalancerCapabilities;
//     interval: number;
//     max_crashes: number;
//     auto_shutdown_exe: string;
//     auto_shutdown_params: string;
// }


// export enum LoadBalancerCapabilities {
//     TcpLevel = 1,
//     HttpLevel
// }


// export class ProcessOrphaning {
//     enabled: boolean;
//     orphan_action_exe: string;
//     orphan_action_params: string;
// }

// export type ProcessModelIdentityType = "LocalSystem" | "LocalService" | "NetworkService" | "SpecificUser" | "ApplicationPoolIdentity";
// export const ProcessModelIdentityType = {
//     LocalSystem: "LocalSystem" as ProcessModelIdentityType,
//     LocalService: "LocalService" as ProcessModelIdentityType,
//     NetworkService: "NetworkService" as ProcessModelIdentityType,
//     SpecificUser: "SpecificUser" as ProcessModelIdentityType,
//     ApplicationPoolIdentity: "ApplicationPoolIdentity" as ProcessModelIdentityType
// }

