
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseDialogComponent, DialogService } from '@msft-sme/angular';
import { Logging } from '@msft-sme/core';
import { take } from 'rxjs/operators';
import { stringifySafe } from 'src/app/iis-mgmt/common/util/string-utils';
import { Strings } from 'src/generated/strings';

export enum DialogInfo {
    OK,
    Cancel,
}

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

    showDialog(param: T = null) {
        this.visible = true;
        super.show(param).pipe(take(1)).subscribe(
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
}

const logSource = (typeof IISDialogComponent).toString();