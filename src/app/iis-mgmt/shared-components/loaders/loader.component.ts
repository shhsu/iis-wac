
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { LoadingWheelModule } from '@msft-sme/angular';
import { Logging } from '@msft-sme/core';
import { Observable, Subscription } from 'rxjs';
import { stringifySafe } from 'src/app/iis-mgmt/common/util/string-utils';
import { Strings } from 'src/generated/strings';
import { Module as ErrorModule } from './error.component';

@Component({
    selector: 'loader',
    template: `
<sme-loading-wheel *ngIf="loading"></sme-loading-wheel>
<error *ngIf="error" [headline]="strings.MsftIISWAC.errors.onLoad" [error]="error"></error>
<ng-content *ngIf="show"></ng-content>
`,
})
export class LoaderComponent implements OnInit {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    private content: Observable<any>;

    @Input()
    enableReload = true;

    loading = true;
    error: Error;
    item: any;
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
        this.item = null;
        this.error = null;
        this.subscription = this.content.subscribe(
            item => {
                if (this.item) {
                    Logging.logError(logSource,
                        `Replacing old item ${stringifySafe(this.item)} with ${stringifySafe(item)}`);
                }
                this.item = item;
                Logging.logVerbose(logSource, `Marking component as loaded`);
                this.loading = false;
            },
            e => {
                this.loading = false;
                this.error = e;
                Logging.logError(logSource, `Error occurred while loading item ${stringifySafe(e)}`);
            },
            () => {
                if (this.loading) {
                    this.error = new Error('Resource not found');
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
