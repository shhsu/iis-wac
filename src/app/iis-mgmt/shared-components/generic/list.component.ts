import { OnInit, ViewChild } from '@angular/core';
import { DataTableComponent } from '@microsoft/windows-admin-center-sdk/angular';
import { Logging } from '@microsoft/windows-admin-center-sdk/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WACComponent } from './wac-component';

export abstract class ListComponent<T> extends WACComponent implements OnInit {
    @ViewChild('dataTable')
    private dataTable: DataTableComponent;

    public items: T[] = [];
    public selected: T;

    constructor(
        private refreshRate: number = null,
    ) {
        super(true);
    }

    ngOnInit(): void {
        this.content = this.contents.pipe(
          tap(
              site => {
                  this.items.push(site);
                  if (this.dataTable &&
                    this.refreshRate != null &&
                    this.items.length % this.refreshRate === 0) {
                    this.dataTable.refreshData();
                  }
              },
              () => {
                  if (this.dataTable) {
                    this.dataTable.refreshData();
                  }
                  Logging.logVerbose(logSource, `list loaded, number of entries ${this.items.length}`);
              }),
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

    abstract get contents(): Observable<T>;
}

const logSource = (typeof ListComponent).toString();
