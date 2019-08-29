import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Strings } from 'src/generated/strings';
import { IISDialogComponent } from './iis-dialog.component';

@Component({
    selector: 'iis-selector-dialog',
    template: `
<iis-dialog #dialog [title]="title">
    <ng-content></ng-content>
    <div class="sme-arrange-stack-h sme-arrange-stack-inline">
        <button class="sme-button-primary" [disabled]="!valid" (click)="ok()">{{strings.MsftIISWAC.common.ok}}</button>
        <button (click)="cancel()">{{strings.MsftIISWAC.common.cancel}}</button>
    </div>
</iis-dialog>
`,
})
export class IISSelectorDialogComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    title: string;

    @Input()
    selector: any;

    @ViewChild('dialog')
    dialog: IISDialogComponent<any>;

    @Output()
    proceed = new EventEmitter<boolean>();

    get valid() {
        // possible SME bug, how do we know if dataTable items are not array itself?
        return this.selector && this.selector.dataTable &&
            this.selector.dataTable.selection && !Array.isArray(this.selector.dataTable.selection);
    }

    get visible() {
        return this.dialog.visible;
    }

    showAsync(param: any = null) {
        return this.dialog.showAsync(param);
    }

    ok() {
        this.dialog.ok();
        this.proceed.next(true);
    }

    cancel() {
        this.dialog.cancel();
    }
}
