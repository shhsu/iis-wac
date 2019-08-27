
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationPool } from 'src/app/iis-mgmt/models/app-pool';
import { PowerShellScripts } from 'src/generated/powershell-scripts';
import { PowershellService } from './powershell.service';
import { RepositoryService } from './repository.service';
import { StatusChangeService } from './status-change.service';

export const AppPoolIdentifierField = 'appPoolName';

@Injectable()
export class AppPoolService extends RepositoryService<ApplicationPool> implements StatusChangeService {
    constructor(
        ps: PowershellService,
    ) {
        super(
            ps,
            [[AppPoolIdentifierField, 'Name']],
            PowerShellScripts.Iis_appPools.Get_AppPools.script,
            ApplicationPool.transform,
        );
    }

    start(target: any): Observable<any> {
        throw new Error('Method not implemented.');
    }
    stop(target: any): Observable<any> {
        throw new Error('Method not implemented.');
    }
    restart(target: any): Observable<any> {
        throw new Error('Method not implemented.');
    }
}
