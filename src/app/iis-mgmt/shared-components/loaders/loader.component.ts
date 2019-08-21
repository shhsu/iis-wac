
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { AppContextService, LoadingWheelModule } from '@msft-sme/angular';
import { Logging } from '@msft-sme/core';
import { Observable, Subscription } from 'rxjs';
import { deepCopyNaive, deepEqualNaive } from 'src/app/iis-mgmt/common/util/serialization';
import { Strings } from 'src/generated/strings';
import { Module as ErrorModule } from './error.component';

@Component({
    selector: 'loader',
    template: `
<sme-loading-wheel *ngIf="loading"></sme-loading-wheel>
<error *ngIf="error" [headline]="strings.MsftIISWAC.errors.onLoad" [error]="error"></error>
<ng-content *ngIf="show"></ng-content>
<div *ngIf="show && !implicitCommit">
    <button class="sme-button-primary" (click)="onSubmit()">{{strings.MsftIISWAC.common.submit}}</button>
    <button click="onCancel()">{{strings.MsftIISWAC.common.cancel}}</button>
</div>
`,
})
export class LoaderComponent implements OnInit {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    private content: Observable<any>;

    @Input()
    enableReload = true;

    @Input()
    implicitCommit = false;

    @Input()
    editInMemory = false;

    @Input()
    submit: () => Promise<any>;

    @Input()
    cancel: () => {};

    loading = true;
    error: Error;
    private _original: any;
    private _edited: any;
    private subscription: Subscription;

    constructor(
        private appContext: AppContextService,
    ) {
    }

    public get show() {
        return !this.loading && !this.error;
    }

    get item() {
        return this._edited;
    }

    // TODO: do this on navigation?
    onCancel() {
        if (!deepEqualNaive(this._original, this._edited)) {
            this.appContext.frame.showDialogConfirmation({
                title: this.strings.MsftIISWAC.common.discardChangeTitle,
                message: this.strings.MsftIISWAC.common.discardChangeMessage,
                confirmButtonText: this.strings.MsftIISWAC.common.proceed,
                cancelButtonText: this.strings.MsftIISWAC.common.cancel,
            }).subscribe(
                response => {
                    if (response.confirmed) {
                        this.cancel();
                    }
                },
                e => {
                    Logging.logWarning(logSource, `Error during cancel dialog ${e}`);
                }
            );
        }
    }

    onSubmit() {
        if (deepEqualNaive(this._original, this._edited)) {
            Logging.logVerbose(logSource, `No changes were made, submit action will translate to cancel action`);
            this.cancel();
        } else {
            this.loading = true;
            this.submit().then(
                _ => this.reload()
            ).catch(e => {
                this.error = e;
                this.loading = false;
            });
        }
    }

    ngOnInit() {
        this.reload();
    }

    reload() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.loading = true;
        this._original = null;
        this._edited = null;
        this.error = null;
        this.subscription = this.content.subscribe(
            item => {
                if (this._original) {
                    Logging.logError(logSource,
                        `Loader is replacing old item ${this._original.toString()} with ${item.toString()}`);
                }
                this._original = item;
                this._edited = deepCopyNaive(this._original);
                Logging.logVerbose(logSource, `Marking component as loaded`);
                this.loading = false;
            },
            e => {
                this.loading = false;
                this.error = e;
                Logging.logError(logSource, `Error occurred while loading item ${e.message}\n${e.toString()}`);
            },
            () => {
                if (this.loading) {
                    Logging.logError(logSource, `Marking component as loaded even though no item received`);
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
