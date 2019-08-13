import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { parseRoute } from '../common/util/route-parsing';

export abstract class RepositoryService<T> {
    abstract getAll(): Observable<T>;
    abstract get(id: any): Observable<T>;
    abstract set(id: any, item: T): Observable<T>;

    fromRoute(route: ActivatedRoute): Observable<T> {
        return parseRoute(route).pipe(
            mergeMap(key => this.get(key)),
        );
    }
}
