import { AfterContentInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataTableComponent } from '@msft-sme/angular';
import { Logging } from '@msft-sme/core';
import { Observable, Subscription } from 'rxjs';
import { stringifySafe } from 'src/app/iis-mgmt/common/util/string-utils';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'iis-list-loader contents',
    template: '<ng-content></ng-content>',
})
export class ContentWrapperComponent implements OnInit { // for some reason this needs to be exported otherwise inlineCompile fails
    @Input()
    private table: DataTableComponent;

    ngOnInit(): void {
        // handles the first refresh right after content is shown
        this.table.refreshData();
    }
}

@Component({
    selector: 'iis-list-loader',
    templateUrl: 'list-loader.component.html',
})
export class ListLoaderComponent implements AfterContentInit, OnDestroy {
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
    public loading = true;
    private subscription: Subscription;
    error: Error;

    reload() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.items = [];
        this.loading = true;
        this.error = null;
        this.subscription = this.observes.subscribe(
            item => {
                this.items.push(item);
                if (this.select && item[this.select[0]] === this.select[1]) {
                    this.table.selection = item;
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

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

const logSource = (typeof ListLoaderComponent).toString();
