
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseDialogComponent, DialogService } from '@msft-sme/angular';
import { Logging } from '@msft-sme/core';
import { take } from 'rxjs/operators';
import { Strings } from 'src/generated/strings';
export enum DialogInfo {
    OK,
    Cancel,
}

@Component({
    selector: 'iis-dialog',
    templateUrl: 'iis-dialog.component.html',
})
export class IISDialogComponent extends BaseDialogComponent<{}, DialogInfo> {
    public readonly strings = MsftSme.resourcesStrings<Strings>();
    @Input()
    title: string;

    @Output()
    output = new EventEmitter<any>();

    visible = false;

    constructor(
        dialogSrv: DialogService,
    ) {
        super(dialogSrv);
    }

    onSubmit() {
        // TODO: validate
        this.hide(DialogInfo.OK);
        this.visible = false;
    }

    onCancel() {
        this.hide(DialogInfo.Cancel);
        this.visible = false;
    }

    showDialog() {
        this.visible = true;
        super.show({}).pipe(take(1)).subscribe(
            v => {
                if (v === DialogInfo.OK) {
                    this.output.next(v);
                }
            },
            e => {
                Logging.logWarning(logSource, `Dialog ended with error ${e}`);
            },
        );
    }
}

const logSource = (typeof IISDialogComponent).toString();
