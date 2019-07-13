import { OnInit } from '@angular/core';
import { Logging } from '@microsoft/windows-admin-center-sdk/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WACComponent } from './wac-component';

export abstract class ListComponent<T> extends WACComponent implements OnInit {
    public items: T[] = [];
    public selected: T;

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.content = this.contents.pipe(
          tap(
              site => this.items.push(site),
              _ => {},
              () => {
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
