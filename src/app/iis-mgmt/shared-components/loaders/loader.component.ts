
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { LoadingWheelModule } from '@microsoft/windows-admin-center-sdk/angular';
import { Logging } from '@microsoft/windows-admin-center-sdk/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'loader',
    template: `
<sme-loading-wheel *ngIf="loading"></sme-loading-wheel>
<!-- TODO: error handling -->
<div *ngIf="!loading">
    <ng-content></ng-content>
</div>
`,
})
export class LoaderComponent {
    // This callback tells the loader when we can mark loading as false and allow rendering
    // the default is never to show the content until observable completes
    @Input()
    private canShowWhen = ((_: any[]) => false);
    public loading = true;
    public readonly items = [];
    private error: Error;

    public get show() {
        return !this.loading && !this.error;
    }

    @Input()
    protected set content(o: Observable<any>) {
        o.subscribe(
            item => {
                this.items.push(item);
                if (this.canShowWhen && this.canShowWhen(this.items)) {
                    this.loading = false;
                }
            },
            error => {
                this.error = error;
            },
            () => {
                Logging.logVerbose(logSource, `Marking component as loaded`);
                if (this.loading) {
                    this.loading = false;
                }
            },
        );
    }
}

const logSource = (typeof LoaderComponent).toString();

@NgModule({
    imports: [
        CommonModule,
        LoadingWheelModule,
    ],
    exports: [
        LoaderComponent,
    ],
    declarations: [
        LoaderComponent,
    ],
})
export class Module {
}
