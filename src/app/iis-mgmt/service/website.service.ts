
import { Injectable } from '@angular/core';
import { PowerShell } from '@microsoft/windows-admin-center-sdk/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebSite } from 'src/app/iis-mgmt/models/website';
import { PowershellService } from 'src/app/iis-mgmt/service/powershell.service';
import { PowerShellScripts } from 'src/generated/powershell-scripts';
import { RepositoryService } from './repository.service';

@Injectable()
export class WebSiteService implements RepositoryService<WebSite> {
    constructor(
        private ps: PowershellService,
    ) {}

    public getAll(): Observable<WebSite> {
        const psCommand = PowerShell.createScript(PowerShellScripts.Iis.Get_WebSite.script);
        return this.ps.get(psCommand).pipe(map(WebSite.aggregate));
    }

    public get(id: number): Observable<WebSite> {
        const psCommand = PowerShell.createScript(
            PowerShellScripts.Iis.Get_WebSite.script,
            { id: id },
        );
        return this.ps.get(psCommand).pipe(map(WebSite.aggregate));
    }
}
