import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { DataTableComponent, LoadingWheelModule } from '@microsoft/windows-admin-center-sdk/angular';
import { Logging } from '@microsoft/windows-admin-center-sdk/core';
import { Observable } from 'rxjs';

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
<!-- TODO: add error handling -->
<contents *ngIf="!loading" [table]="table">
    <ng-content></ng-content>
</contents>
`,
})
export class ListLoaderComponent implements OnInit {
    @Input()
    private observes: Observable<any>;
    @Input()
    private refreshRate = null;

    @Input()
    public readonly table: DataTableComponent;
    public readonly items = [];
    public selected: any;
    public loading = true;

    ngOnInit(): void {
        this.observes.subscribe(
            item => {
                this.items.push(item);
                if (this.table &&
                    this.refreshRate != null &&
                    this.items.length % this.refreshRate === 0) {
                    this.loading = false;
                    this.table.refreshData();
                }
            },
            e => {
                // handle error
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
