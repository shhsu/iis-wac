import { ActivatedRoute } from '@angular/router';
import { PowerShell } from '@msft-sme/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { parseRoute } from 'src/app/iis-mgmt/common/util/route-parsing';
import { PowershellService } from './powershell.service';

export class RepositoryService<T> {
    constructor(
        private ps: PowershellService,
        private paramMappings: [string, string][],
        private scriptForGet: string,
        private transform: (any) => T,
    ) { }

    getAll(): Observable<T> {
        const psCommand = PowerShell.createScript(this.scriptForGet);
        return this.ps.get(psCommand).pipe(
            map(this.transform),
        );
    }

    get(key: any): Observable<T> {
        const param: any = {};
        for (const mapping of this.paramMappings) {
            const appKey = mapping[0];
            const psKey = mapping[1];
            param[psKey] = key[appKey];
        }
        const psCommand = PowerShell.createScript(this.scriptForGet, param);
        return this.ps.get(psCommand).pipe(map(this.transform));
    }

    set(id: any, item: T): Observable<T> {
        // TODO: do something
        return of(item);
    }

    fromRoute(route: ActivatedRoute): Observable<T> {
        return parseRoute(route).pipe(
            mergeMap(key => this.get(key)),
        );
    }
}
