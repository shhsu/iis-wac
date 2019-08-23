
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Website } from 'src/app/iis-mgmt/models/website';
import { PowerShellScripts } from 'src/generated/powershell-scripts';
import { PowershellService } from './powershell.service';
import { RepositoryService } from './repository.service';
import { StatusChangeService } from './status-change.service';

export const WebsiteIdentifierField = 'webSiteId';  // we could also use name

@Injectable()
export class WebSiteService extends RepositoryService<Website> implements StatusChangeService {
    constructor(
        ps: PowershellService,
    ) {
        super(ps,
            [[WebsiteIdentifierField, 'id']],
            PowerShellScripts.Iis_website.Get_WebSite.script,
            Website.transform,
        );
    }

    start(_: any): Observable<any> {
        throw new Error('not implemented');
    }

    stop(_: any): Observable<any> {
        throw new Error('not implemented');
    }

    restart(_: any): Observable<any> {
        throw new Error('not implemented');
    }
}
