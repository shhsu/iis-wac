import { Observable } from 'rxjs';

export interface StatusChangeService {
    start(target: any): Observable<any>;
    stop(target: any): Observable<any>;
    restart(target: any): Observable<any>;
}
