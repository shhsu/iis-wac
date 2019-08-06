
import { Injectable } from '@angular/core';
import { PowerShell } from '@microsoft/windows-admin-center-sdk/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebSite } from 'src/app/iis-mgmt/models/website';
import { PowershellService } from 'src/app/iis-mgmt/service/powershell.service';
import { PowerShellScripts } from 'src/generated/powershell-scripts';
import { RepositoryService } from './repository.service';

export const WebsiteIdentifierField = 'webSiteId';  // we could also use name

@Injectable()
export class WebSiteService extends RepositoryService<WebSite> {
    constructor(
        private ps: PowershellService,
    ) {
        super();
    }

    public getAll(): Observable<WebSite> {
        const psCommand = PowerShell.createScript(PowerShellScripts.Iis.Get_WebSite.script);
        return this.ps.get(psCommand).pipe(
            map(WebSite.aggregate),
        );
    }

    public get(key: any): Observable<WebSite> {
        const id = key[WebsiteIdentifierField];
        const psCommand = PowerShell.createScript(
            PowerShellScripts.Iis.Get_WebSite.script,
            { id: id },
        );
        return this.ps.get(psCommand).pipe(map(WebSite.aggregate));
    }
}
