import { Component, Input } from '@angular/core';
import { BaseDialogComponent } from '@msft-sme/angular';
import { enumerateKnownProperties, formatF, stringifySafe } from 'src/app/iis-mgmt/common/util/string-utils';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'iis-error-dialog',
    templateUrl: './error-dialog.component.html',
    styles: [`
error-details {
    white-space: pre-wrap;
}
`],
})
export class ErrorDialogComponent extends BaseDialogComponent<{}, {}> {
    public readonly strings = MsftSme.resourcesStrings<Strings>();
    @Input()
    error: any;

    get knownProperties() {
        return enumerateKnownProperties(this.error);
    }

    get lineInfo() {
        return formatF(this.strings.MsftIISWAC.errors.lineInfo, this.error.fileName, this.error.lineNumber, this.error.columnNumber);
    }

    get errorObjectDump() {
        return stringifySafe(this.error);
    }

    onOK() {
        this.hide(null);
    }
}
