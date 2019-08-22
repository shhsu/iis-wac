import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, Input, NgModule, OnInit } from '@angular/core';
import { DataTableComponent, LoadingWheelModule } from '@msft-sme/angular';
import { Logging } from '@msft-sme/core';
import { Observable, Subscription } from 'rxjs';
import { stringifySafe } from 'src/app/iis-mgmt/common/util/string-utils';
import { Strings } from 'src/generated/strings';
import { Module as ErrorModule } from './error.component';

@Component({
    selector: 'list-loader contents',
    template: '<ng-content></ng-content>',
})
export class ContentWrapperComponent implements OnInit {
    @Input()
    private table: DataTableComponent;

    ngOnInit(): void {
        // handles the first refresh right after content is shown
        this.table.refreshData();
    }
}

@Component({
    selector: `list-loader`,
    template: `
<sme-loading-wheel *ngIf="loading"></sme-loading-wheel>
<error *ngIf="error" [headline]="strings.MsftIISWAC.errors.onList" [error]="error"></error>
<contents *ngIf="!loading" [table]="table">
    <ng-content></ng-content>
</contents>
`,
})
export class ListLoaderComponent implements AfterContentInit {
    public readonly strings = MsftSme.resourcesStrings<Strings>();
    @Input()
    private observes: Observable<any>;
    @Input()
    private refreshRate = null;
    @Input()
    private select: [string, any];

    @Input()
    public readonly table: DataTableComponent;
    public items = [];
    public selected: any;
    public loading = true;
    private subscription: Subscription;
    error: Error;

    reload() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.items = [];
        this.selected = null;
        this.loading = true;
        this.error = null;
        this.subscription = this.observes.subscribe(
            item => {
                this.items.push(item);
                console.error(`loaded ${item.name}`);
                if (this.select && item[this.select[0]] === this.select[1]) {
                    this.selected = item;
                }
                if (this.table &&
                    this.refreshRate != null &&
                    this.items.length % this.refreshRate === 0) {
                    this.loading = false;
                    this.table.refreshData();
                }
            },
            e => {
                this.error = e;
                this.loading = false;
                Logging.logError(logSource, `Error occurred while loading list ${stringifySafe(e)}`);
            },
            () => {
                this.loading = false;
                if (this.table) {
                    this.table.refreshData();
                }
                Logging.logVerbose(logSource, `list loaded, number of entries ${this.items.length}`);
            }
        );
    }

    ngAfterContentInit() {
        this.reload();
    }

    canAdd(): boolean {
        return !this.loading;
    }

    canRemove(): boolean {
        return !this.loading;
    }

    canEdit(): boolean {
        return !!this.selected;
    }
}

const logSource = (typeof ListLoaderComponent).toString();

@NgModule({
    imports: [
        CommonModule,
        LoadingWheelModule,
        ErrorModule,
    ],
    exports: [
        ListLoaderComponent,
        ContentWrapperComponent,
    ],
    declarations: [
        ListLoaderComponent,
        ContentWrapperComponent,
    ],
})
export class Module { }
