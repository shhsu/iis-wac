import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface DeactivateGuardedComponent {
    canDeactivate(
        _: ActivatedRouteSnapshot,  // currentRoute
        __: RouterStateSnapshot, // currentState
        ___?: RouterStateSnapshot,  // nextState
    ): Observable<boolean>;
}
