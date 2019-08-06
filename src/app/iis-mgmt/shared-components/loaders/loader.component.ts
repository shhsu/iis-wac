
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { LoadingWheelModule } from '@microsoft/windows-admin-center-sdk/angular';
import { Logging } from '@microsoft/windows-admin-center-sdk/core';
import { Observable, Subscription } from 'rxjs';
import { Strings } from 'src/generated/strings';
import { Module as ErrorModule } from './error.component';
@Component({
    selector: 'loader',
    template: `
<sme-loading-wheel *ngIf="loading"></sme-loading-wheel>
<error *ngIf="error" [headline]="strings.MsftIISWAC.errors.onLoad" [error]="error"></error>
<ng-content></ng-content>
`,
})
export class LoaderComponent implements OnInit {
    public readonly strings = MsftSme.resourcesStrings<Strings>();
    // This callback tells the loader when we can mark loading as false and allow rendering
    // the default is never to show the content until observable completes
    @Input()
    private canShowWhen = ((_: any[]) => false);

    @Input()
    private content: Observable<any>;

    loading = true;
    items = [];
    error: Error;
    private subscription: Subscription;

    public get show() {
        return !this.loading && !this.error;
    }

    ngOnInit() {
        this.reload();
    }

    reload() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.loading = true;
        this.items = [];
        this.error = null;
        this.subscription = this.content.subscribe(
            item => {
                this.items.push(item);
                if (this.canShowWhen && this.canShowWhen(this.items)) {
                    this.loading = false;
                }
            },
            e => {
                this.loading = false;
                this.error = e;
                Logging.logError(logSource, `Error occurred while loading item ${e.message}\n${e.toString()}`);
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
        ErrorModule,
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
