
import { Injectable } from '@angular/core';
import { ApplicationPool } from 'src/app/iis-mgmt/models/app-pool';
import { PowerShellScripts } from 'src/generated/powershell-scripts';
import { PowershellService } from './powershell.service';
import { RepositoryService } from './repository.service';

export const AppPoolIdentifierField = 'app-pool';

@Injectable()
export class AppPoolService extends RepositoryService<ApplicationPool> {
    constructor(
        ps: PowershellService,
    ) {
        super(
            ps,
            [[AppPoolIdentifierField, 'id']],
            PowerShellScripts.Iis_appPools.Get_AppPools.script,
            ApplicationPool.transform,
        );
    }
}
