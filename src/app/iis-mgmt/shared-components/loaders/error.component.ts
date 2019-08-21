import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, ViewChild } from '@angular/core';
import { DialogModule, HealthAlertSeverity } from '@msft-sme/angular';
import { Strings } from 'src/generated/strings';
import { ErrorDialogComponent } from './error-dialog.component';

@Component({
    selector: 'error',
    template: `
<sme-page-alert-bar [alert]="alert"></sme-page-alert-bar>
<iis-error-dialog id="iis-error-dialog" [error]="error"></iis-error-dialog>
`,
})
export class ErrorComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    severity = HealthAlertSeverity.Critical;
    @Input()
    headline: string;
    @Input()
    error: Error;

    @ViewChild('iis-error-dialog')
    dialog: ErrorDialogComponent;

    get alert() {
        return {
            severity: this.severity,
            message: this.headline,
            detailsCaption: this.strings.MsftIISWAC.errors.details,
            detailsCommand: _ => this.dialog.show(null),
        };
    }
}

@NgModule({
    imports: [
        CommonModule,
        DialogModule,
    ],
    exports: [
        ErrorDialogComponent,
        ErrorComponent,
    ],
    declarations: [
        ErrorComponent,
    ],
})
export class Module {
}
