import { Injectable } from '@angular/core';
import { Logging } from '@msft-sme/core';
import { DeactivateGuardedComponent } from 'src/app/iis-mgmt/common/can-deactivate';
import { stringifySafe } from 'src/app/iis-mgmt/common/util/string-utils';

@Injectable()
export class RouteDeactivationService {
    public form: DeactivateGuardedComponent;

    public Register(form: DeactivateGuardedComponent) {
        if (this.form) {
            Logging.logError(logSource, `Form already registered: ${stringifySafe(this.form)}`);
        }
        Logging.logDebug(logSource, 'registered form');
        this.form = form;
    }

    public Release() {
        if (!this.form) {
            Logging.logError(logSource, `No form was registered`);
        }
        Logging.logDebug(logSource, 'released form');
        this.form = null;
    }
}

const logSource = (typeof RouteDeactivationService).toString();
