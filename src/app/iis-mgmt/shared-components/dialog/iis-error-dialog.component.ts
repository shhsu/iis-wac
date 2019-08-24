import { Component } from '@angular/core';
import { BaseDialogComponent, DialogService } from '@msft-sme/angular';
import { enumerateKnownErrorProperties, formatF, stringifySafe } from 'src/app/iis-mgmt/common/util/string-utils';
import { Strings } from 'src/generated/strings';
import { DialogInfo } from './iis-dialog.component';

export class IISErrorDialogOptions {
    headline: string;
    error: any;
    showDetails: boolean;
}

@Component({
    selector: 'iis-error-dialog',
    templateUrl: './iis-error-dialog.component.html',
    styles: [`
error-details {
    white-space: pre-wrap;
}
`],
})
export class IISErrorDialogComponent extends BaseDialogComponent<IISErrorDialogOptions, DialogInfo> {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    _options: IISErrorDialogOptions;
    knownProperties: string[];
    lineInfo: string;
    errorObjectDump: string;
    stack: any;

    constructor(
        srv: DialogService,
    ) {
        super(srv);
    }

    get options() {
        return this._options;
    }

    set options(o: IISErrorDialogOptions) {
        this._options = o;
        if (o) {
            this.knownProperties = Array.from(enumerateKnownErrorProperties(o.error));
            this.lineInfo = formatF(
                this.strings.MsftIISWAC.errors.lineInfo,
                o.error.fileName,
                o.error.lineNumber,
                o.error.columnNumber);
            this.errorObjectDump = stringifySafe(o.error);
            this.stack = o.error.stack;
        }
    }

    get toggleButtonText() {
        if (this.options.showDetails) {
            return this.strings.MsftIISWAC.errors.less;
        }
        return this.strings.MsftIISWAC.errors.more;
    }

    show(options: IISErrorDialogOptions) {
        this.options = options;
        return super.show(null);
    }

    toggleDetails() {
        this.options.showDetails = !this.options.showDetails;
    }

    onOK() {
        this.hide(DialogInfo.OK);
    }
}
