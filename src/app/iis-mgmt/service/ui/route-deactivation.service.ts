import { Injectable } from '@angular/core';
import { Logging } from '@msft-sme/core';
import { DeactivateGuardedComponent } from 'src/app/iis-mgmt/common/can-deactivate';

@Injectable()
export class RouteDeactivationService {
    private _forms: DeactivateGuardedComponent[] = [];

    public Register(form: DeactivateGuardedComponent) {
        Logging.logDebug(logSource, 'registered form');
        this._forms.push(form);
    }

    public Release() {
        Logging.logDebug(logSource, 'released form');
        this._forms.pop();
    }

    get top() {
        if (!this._forms.length) {
            return null;
        }
        return this._forms.last();
    }
}

const logSource = (typeof RouteDeactivationService).toString();
