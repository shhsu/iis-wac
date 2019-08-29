import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, ViewChild } from '@angular/core';
import { HealthAlertSeverity, PageAlertBarModule } from '@msft-sme/angular';
import { IISErrorDialogComponent } from 'src/app/iis-mgmt/shared-components/dialog/error/iis-error-dialog.component';
import { IISErrorDialogModule } from 'src/app/iis-mgmt/shared-components/dialog/error/iis-error-dialog.module';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'error',
    template: `
<sme-page-alert-bar id="iis-error-alert-bar" [alert]="alert"></sme-page-alert-bar>
<iis-error-dialog #dialog id="iis-error-dialog"></iis-error-dialog>
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

    @ViewChild('dialog')
    dialog: IISErrorDialogComponent;

    get alert() {
        return {
            severity: this.severity,
            message: this.headline,
            detailsCaption: this.strings.MsftIISWAC.errors.details,
            detailsCommand: _ => this.dialog.show({
                headline: this.headline,
                error: this.error,
                showDetails: true,
            }),
        };
    }
}

@NgModule({
    imports: [
        CommonModule,
        IISErrorDialogModule,
        PageAlertBarModule,
    ],
    exports: [
        ErrorComponent,
    ],
    declarations: [
        ErrorComponent,
    ],
})
export class Module {
}
