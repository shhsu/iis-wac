import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebServer } from 'src/app/iis-mgmt/models/webserver';
import { PowerShellScripts } from 'src/generated/powershell-scripts';
import { PowershellService } from './powershell.service';

@Injectable()
export class WebServerService {
    constructor(
        private psSrv: PowershellService,
    ) {
    }

    get WebServer(): Observable<WebServer> {
        return this.psSrv.get(PowerShellScripts.Iis_webserver.Get_WebServer.script).pipe(
            map(WebServer.aggregate),
        );
    }
}
