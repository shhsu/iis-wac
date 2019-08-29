import { Component, Input, ViewChild } from '@angular/core';
import { DataTableComponent } from '@msft-sme/angular';
import { Logging } from '@msft-sme/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { stringifySafe } from 'src/app/iis-mgmt/common/util/string-utils';
import { IISDialogComponent } from 'src/app/iis-mgmt/shared-components/dialog/iis-dialog.component';
import { FormEditMode, IISFormComponent } from 'src/app/iis-mgmt/shared-components/form/iis-form.component';
import { Strings } from 'src/generated/strings';
import { DialogInfo } from './dialog-info';

export interface PersistenceMechanic<TData, TDialogParam> {
    getCreateParam(): TDialogParam;
    getEditParam(selected: TData): TDialogParam;
    save(param: TDialogParam, value: TData): Observable<any>;
}

class TablePersistenceMechanic<TData> implements PersistenceMechanic<TData, number> {
    constructor(
        private table: DataTableComponent,
    ) { }

    getCreateParam() {
        return null;
    }

    getEditParam(selected: TData): number {
        return this.table.items.findIndex(v => v === selected);
    }

    save(index: number, value: TData) {
        if (index === null) {
            this.table.items.push(value);
        } else {
            this.table.items[index] = value;
        }
        this.table.refreshData();
        return of(value);
    }
}

@Component({
    selector: 'iis-collection-dialog',
    templateUrl: 'iis-collection-dialog.component.html',
})
export class IISCollectionDialogComponent<T> {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    create: () => T;

    @Input()
    createHeader: string;

    @Input()
    editHeader: string;

    @Input()
    selected: T;
    item: T;

    @ViewChild('form')
    form: IISFormComponent;

    editMode: FormEditMode;

    @Input()
    set dataTable(table: DataTableComponent) {
        this.core = new TablePersistenceMechanic<T>(table);
    }

    @ViewChild('arrayDialog')
    dialog: IISDialogComponent<number>;
    dialogHeader: string;
    core: PersistenceMechanic<T, any>;

    get editing() {
        if (this.form) {
            return this.form.item;
        }
        return null;
    }

    get editable() {
        return this.selected;
    }

    get visible() {
        return this.form && this.dialog.visible;
    }

    onEdit() {
        this.dialogHeader = this.editHeader;
        this.item = this.selected;
        this.editMode = FormEditMode.Existing;
        const param = this.core.getEditParam(this.selected);
        this.showDialog(param);
    }

    onNew() {
        this.dialogHeader = this.createHeader;
        this.item = this.create();
        this.editMode = FormEditMode.New;
        const param = this.core.getCreateParam();
        this.showDialog(param);
    }

    private showDialog(param: any) {
        this.dialog.show().pipe(take(1)).subscribe(
            v => {
                if (v === DialogInfo.OK) {
                    this.core.save(param, this.form.item);
                    this.selected = this.form.item;
                } else {
                    Logging.logVerbose(logSource, `Dialog ending with status ${v}`);
                }
            },
            e => {
                Logging.logError(logSource, `Error during showing dialog ${stringifySafe(e)}`);
            },
        );
    }
}

const logSource = (typeof IISCollectionDialogComponent).toString();
