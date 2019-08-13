
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { LoadingWheelModule } from '@msft-sme/angular';
import { Logging } from '@msft-sme/core';
import { Observable, Subscription } from 'rxjs';
import { Strings } from 'src/generated/strings';
import { Module as ErrorModule } from './error.component';

@Component({
    selector: 'loader',
    template: `
<sme-loading-wheel *ngIf="loading"></sme-loading-wheel>
<error *ngIf="error" [headline]="strings.MsftIISWAC.errors.onLoad" [error]="error"></error>
<ng-content *ngIf="show"></ng-content>
<div *ngIf="show && !implicitCommit">
    <button class="sme-button-primary" (click)="submit()">{{strings.MsftIISWAC.common.submit}}</button>
    <button click="cancelAction()">{{strings.MsftIISWAC.common.cancel}}</button>
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
    submitAction: () => Promise<any>;

    @Input()
    cancelAction: () => {};

    loading = true;
    error: Error;
    item: any;
    private subscription: Subscription;

    public get show() {
        return !this.loading && !this.error;
    }

    submit() {
        this.loading = true;
        this.submitAction().then(
            item => this.item = item,
        ).catch(e => {
            this.error = e;
        }).finally(
            () => this.loading = false,
        );
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
                    Logging.logWarning(logSource, `Loader is replacing old item ${this.item.toString()} with ${this.item.toString()}`);
                }
                this.item = item;
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
