
import { Injectable } from '@angular/core';
import { Website } from 'src/app/iis-mgmt/models/website';
import { PowerShellScripts } from 'src/generated/powershell-scripts';
import { PowershellService } from './powershell.service';
import { RepositoryService } from './repository.service';

export const WebsiteIdentifierField = 'webSiteId';  // we could also use name

@Injectable()
export class WebSiteService extends RepositoryService<Website> {
    constructor(
        ps: PowershellService,
    ) {
        super(ps,
            [[WebsiteIdentifierField, 'id']],
            PowerShellScripts.Iis_website.Get_WebSite.script,
            Website.transform,
        );
    }
}
