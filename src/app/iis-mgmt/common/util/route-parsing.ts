import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export class RouteKeyMapping {
    routeParamName: string;
    keyParamName: string;
}

export function parseRoute(route: ActivatedRoute): Observable<any> {
    let cursor = route;
    const routeParsers: Observable<any>[] = [];
    const result = {};
    while (cursor != null) {
        if (cursor.component) {
            const keyName = cursor.component['keyName'];
            if (keyName) {
                routeParsers.push(
                    cursor.paramMap.pipe(
                        take(1),
                        map(params => {
                            const keyValue = params.get(keyName);
                            result[keyName] = keyValue;
                        })
                    ),
                );
            }
        }
        cursor = cursor.parent;
    }
    return forkJoin(routeParsers).pipe(
        map(_ => {
            return result;
        })
    );
}
