
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

    @Output()
    proceed = new EventEmitter<T>();

    visible = false;

    constructor(
        dialogSrv: DialogService,
    ) {
        super(dialogSrv);
    }

    onSubmit() {
        // TODO: validate, for example selection cannot be null
        this.hide(DialogInfo.OK);
        this.visible = false;
    }

    onCancel() {
        this.hide(DialogInfo.Cancel);
        this.visible = false;
    }

    // NOTE: do not call this method, call showAsync instead
    show(param: T = null): Subject<DialogInfo> {
        this.visible = true;
        return super.show(param);
    }

    showAsync(param: T = null) {
        this.show(param).pipe(take(1)).subscribe(
            v => {
                if (v === DialogInfo.OK) {
                    this.proceed.next(param);
                }
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
