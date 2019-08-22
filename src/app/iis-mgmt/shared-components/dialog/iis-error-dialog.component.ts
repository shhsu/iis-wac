import { Component, Input } from '@angular/core';
import { BaseDialogComponent } from '@msft-sme/angular';
import { enumerateKnownProperties, formatF, stringifySafe } from 'src/app/iis-mgmt/common/util/string-utils';
import { Strings } from 'src/generated/strings';

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
export class IISErrorDialogComponent extends BaseDialogComponent<IISErrorDialogOptions, {}> {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    options: IISErrorDialogOptions;

    get knownProperties() {
        return enumerateKnownProperties(this.options.error);
    }

    get lineInfo() {
        return formatF(
            this.strings.MsftIISWAC.errors.lineInfo,
            this.options.error.fileName,
            this.options.error.lineNumber,
            this.options.error.columnNumber);
    }

    get errorObjectDump() {
        return stringifySafe(this.options.error);
    }

    get stack() {
        return this.options.error.stack;
    }

    show(options: IISErrorDialogOptions) {
        this.options = options;
        return super.show(null);
    }

    toggleDetails() {
        this.options.showDetails = !this.options.showDetails;
    }

    onOK() {
        this.options = null;
        this.hide(null);
    }
}
