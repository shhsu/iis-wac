import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouteDeactivationService } from './route-deactivation.service';

@Injectable()
export class RouteDeactivationGuard implements CanDeactivate<any> {
    constructor(
        private srv: RouteDeactivationService,
    ) { }

    public canDeactivate(
        _: any, // component
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // TODO: bug fix - if the form is in a dialog, and the dialog hides not due to
        // user clicking ok or cancel but due to user clicking elsewhere on screen
        // we still prompt about discarding changes. does it make any sense?

        // Investigate BaseDialogComponent: closeRequested/keepOpen/onBackgroundClicked
        if (this.srv.top) {
            return this.srv.top.canDeactivate(currentRoute, currentState, nextState);
        }
        return true;
    }
}
