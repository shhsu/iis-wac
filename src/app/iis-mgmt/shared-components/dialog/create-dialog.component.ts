
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseDialogComponent, DialogService } from '@msft-sme/angular';
import { Logging } from '@msft-sme/core';
import { take } from 'rxjs/operators';
import { Strings } from 'src/generated/strings';
export enum DialogInfo {
    OK,
    Cancel,
}

@Component({
    selector: 'iis-create-dialog',
    templateUrl: 'create-dialog.component.html',
})
export class CreateDialogComponent extends BaseDialogComponent<{}, DialogInfo> {
    public readonly strings = MsftSme.resourcesStrings<Strings>();
    @Input()
    title: string;

    @Output()
    created = new EventEmitter<any>();

    constructor(
        private dialogSrv: DialogService,
    ) {
        super(dialogSrv);
    }

    onSubmit() {
        // TODO: validate
        this.hide(DialogInfo.OK);
    }

    onCancel() {
        this.hide(DialogInfo.Cancel);
    }

    showDialog(id: string) {
        this.dialogSrv.show<{}, DialogInfo>(id, {}).pipe(take(1)).subscribe(
            v => {
                if (v === DialogInfo.OK) {
                    this.created.next(v);
                }
            },
            e => {
                Logging.logWarning(logSource, `Dialog ended with error ${e}`);
            },
        );
    }
}

const logSource = (typeof CreateDialogComponent).toString();
