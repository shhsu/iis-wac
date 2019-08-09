import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'error',
    template: `
<div class="sme-position-flex-none sme-position-inset-none sme-color-error">
    <p>{{headline}}{{error.message}}<a class="sme-link" (click)="toggleDetails()">{{linkText}}</a></p>
    <p *ngIf="details" class="error-details">{{details}}</p>
</div>
`,
    styles: [`
error-details {
    white-space: pre-wrap;
}
`],
})
export class ErrorComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    headline: string;
    @Input()
    error: Error;

    details: string = null;

    get linkText() {
        if (this.details) {
            return this.strings.MsftIISWAC.errors.hide;
        } else {
            return this.strings.MsftIISWAC.errors.show;
        }
    }

    toggleDetails() {
        if (this.details) {
            this.details = null;
        } else {
            this.details = `${this.error.message}\n${this.error.stack}`;
        }
    }
}

@NgModule({
    imports: [
        CommonModule,
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
