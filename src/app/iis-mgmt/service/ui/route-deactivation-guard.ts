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
        if (this.srv.form) {
            return this.srv.form.canDeactivate(currentRoute, currentState, nextState);
        }
        return true;
    }
}
