
import { Component, Input } from '@angular/core';
import { BaseDialogComponent, DialogService } from '@msft-sme/angular';
import { Logging } from '@msft-sme/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { stringifySafe } from 'src/app/iis-mgmt/common/util/string-utils';
import { Strings } from 'src/generated/strings';
import { DialogInfo } from './dialog-info';

@Component({
    selector: 'iis-dialog',
    templateUrl: './iis-dialog.component.html',
})
export class IISDialogComponent<T> extends BaseDialogComponent<T, DialogInfo> {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    title: string;

    visible = false;

    constructor(
        dialogSrv: DialogService,
    ) {
        super(dialogSrv);
    }

    ok() {
        this.hide(DialogInfo.OK);
        this.visible = false;
    }

    cancel() {
        this.hide(DialogInfo.Cancel);
        this.visible = false;
    }

    exit(result: boolean) {
        if (result) {
            this.ok();
        } else {
            this.cancel();
        }
    }

    // NOTE: do not call this method, call showAsync instead
    show(param: T = null): Subject<DialogInfo> {
        this.visible = true;
        return super.show(param);
    }

    showAsync(param: T = null) {
        return this.show(param).pipe(take(1)).subscribe(
            v => {
                Logging.logVerbose(logSource, `Dialog ending with ${v}`);
            },
            e => {
                Logging.logError(logSource, `Dialog ended with error ${stringifySafe(e)}`);
            },
        );
    }

    hide(result?: DialogInfo) {
        super.hide(result);
    }
}

const logSource = (typeof IISDialogComponent).toString();
