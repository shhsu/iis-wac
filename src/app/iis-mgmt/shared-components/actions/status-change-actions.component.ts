import { Component, Input } from '@angular/core';
import { Status } from 'src/app/iis-mgmt/models/status';
import { StatusChangeService } from 'src/app/iis-mgmt/service/status-change.service';
import { Strings } from 'src/generated/strings';
import { IISActionsController } from './iis-actions.component';

// NOTE: we don't have to check if selection is array because there is no .status property for array
function canStop(target: any) {
    return target && target.status === Status.Started;
}

function canStart(target: any) {
    return target && target.status === Status.Stopped;
}

@Component({
    selector: 'control-status',
    template: '',   //  couldn't get it to work as directive because the directive object was not selected
})
export class StatusChangeActionsComponent extends IISActionsController {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    srv: StatusChangeService;

    @Input()
    target: any;

    @Input()
    restartText = this.strings.MsftIISWAC.common.restart;

    get actions() {
        return [
            {
                text: this.strings.MsftIISWAC.common.start,
                iconClass: 'sme-icon sme-icon-play',
                isEnabled: () => canStart(this.target),
                execute: () => this.srv.start(this.target),
            },
            {
                text: this.strings.MsftIISWAC.common.stop,
                iconClass: 'sme-icon sme-icon-stop',
                isEnabled: () => canStop(this.target),
                execute: () => this.srv.stop(this.target),
            },
            {
                text: this.restartText,
                iconClass: 'sme-icon sme-icon-refresh',
                isEnabled: () => canStop(this.target),
                execute: () => this.srv.restart(this.target),
            },
        ];
    }
}
