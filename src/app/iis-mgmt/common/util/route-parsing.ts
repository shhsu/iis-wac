import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export class RouteKeyMapping {
    routeParamName: string;
    keyParamName: string;
}

export function parseRoute(keyMappings: [string, string][], route: ActivatedRoute): Observable<any> {
    let cursor = route;
    const routeParsers: Observable<any>[] = [];
    const result = {};
    while (cursor != null) {
        routeParsers.push(
            cursor.paramMap.pipe(
                take(1),
                map(params => {
                    for (const pair of keyMappings) {
                        const keyName = pair[0];
                        const keyValue = params.get(keyName);
                        if (keyValue) {
                            const paramName = pair[1];
                            result[paramName] = keyValue;
                        }
                    }
                })
            ),
        );
        cursor = cursor.parent;
    }
    return forkJoin(routeParsers).pipe(
        map(_ => {
            return result;
        })
    );
}
