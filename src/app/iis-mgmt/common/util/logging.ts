import { Logging } from '@msft-sme/core';
import { Observable, OperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IsProduction } from 'src/environments/environment';

// Debug method: pipe a observable to this method to instrument its performance
export function instrument<T>(source: string, operation: string): OperatorFunction<T, T> {
    if (IsProduction) {
        return (o: Observable<T>): Observable<T> => o;
    } else {
        let count = 0;
        Logging.logDebug(source, `${new Date().toISOString()}: ${operation} scheduled`);
        return (o: Observable<T>): Observable<T> => o.pipe(tap(
            _ => {
                count++;
                Logging.logDebug(source, `${new Date().toISOString()}: ${operation} returned value`);
            },
            _ => {
                Logging.logDebug(source, `${new Date().toISOString()}: ${operation} returned error`);
            },
            () => {
                Logging.logDebug(source, `${new Date().toISOString()}: ${operation} completed, number of results returned: ${count}`);
            }
        ));
    }
}
