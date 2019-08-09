
import { Injectable } from '@angular/core';
import { PowerShell } from '@msft-sme/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Website } from 'src/app/iis-mgmt/models/website';
import { PowershellService } from 'src/app/iis-mgmt/service/powershell.service';
import { PowerShellScripts } from 'src/generated/powershell-scripts';
import { RepositoryService } from './repository.service';

export const WebsiteIdentifierField = 'webSiteId';  // we could also use name

@Injectable()
export class WebSiteService extends RepositoryService<Website> {
    constructor(
        private ps: PowershellService,
    ) {
        super();
    }

    public getAll(): Observable<Website> {
        const psCommand = PowerShell.createScript(PowerShellScripts.Iis.Get_WebSite.script);
        return this.ps.get(psCommand).pipe(
            map(Website.aggregate),
        );
    }

    public get(key: any): Observable<Website> {
        const id = key[WebsiteIdentifierField];
        const psCommand = PowerShell.createScript(
            PowerShellScripts.Iis.Get_WebSite.script,
            { id: id },
        );
        return this.ps.get(psCommand).pipe(map(Website.aggregate));
    }
}
