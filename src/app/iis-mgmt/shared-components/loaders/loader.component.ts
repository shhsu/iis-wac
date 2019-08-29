import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Logging } from '@msft-sme/core';
import { Observable, Subscription } from 'rxjs';
import { stringifySafe } from 'src/app/iis-mgmt/common/util/string-utils';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'iis-loader',
    template: `
<sme-loading-wheel *ngIf="loading" [message]="message" [size]="loadingWheelSize"></sme-loading-wheel>
<error *ngIf="error" [headline]="strings.MsftIISWAC.errors.onLoad" [error]="error"></error>
<ng-content *ngIf="show"></ng-content>
`,
})
export class LoaderComponent implements OnInit, OnDestroy {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    private content: Observable<any>;

    @Input()
    enableReload = true;

    @Input()
    message: string;

    @Input()
    loadingWheelSize = 'large';

    @Input()
    createDefault: () => any;

    loading = true;
    error: Error;
    item: any;
    isDefault = false;
    private subscription: Subscription;

    public get show() {
        return !this.loading && !this.error;
    }

    ngOnInit() {
        this.reload();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
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
                this.isDefault = false;
                this.loading = false;
            },
            e => {
                this.loading = false;
                this.error = e;
                Logging.logError(logSource, `Error occurred while loading item ${stringifySafe(e)}`);
            },
            () => {
                if (this.loading) {
                    if (this.createDefault) {
                        this.isDefault = true;
                        this.item = this.createDefault();
                    } else {
                        this.error = new Error('Resource not found');
                    }
                    this.loading = false;
                }
            },
        );
    }
}

const logSource = (typeof LoaderComponent).toString();
