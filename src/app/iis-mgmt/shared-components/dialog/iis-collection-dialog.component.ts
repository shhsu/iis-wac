import { Component, Input, ViewChild } from '@angular/core';
import { DataTableComponent } from '@msft-sme/angular';
import { IISDialogComponent } from 'src/app/iis-mgmt/shared-components/dialog/iis-dialog.component';

export interface PersistenceMechanic<TData, TDialogParam> {
    getCreateParam(): TDialogParam;
    getEditParam(selected: TData): TDialogParam;
    save(param: TDialogParam, value: TData);
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
    }
}

@Component({
    selector: 'iis-collection-dialog',
    templateUrl: 'iis-collection-dialog.component.html',
})
export class IISCollectionDialogComponent<T> {
    @Input()
    create: () => T;

    @Input()
    createHeader: string;

    @Input()
    editHeader: string;

    @Input()
    selected: T;

    editing: T;

    @Input()
    set dataTable(table: DataTableComponent) {
        this.core = new TablePersistenceMechanic<T>(table);
    }

    @ViewChild('arrayDialog')
    dialog: IISDialogComponent<number>;
    dialogHeader: string;
    core: PersistenceMechanic<T, any>;

    get canEdit() {
        return this.selected !== null;
    }

    get visible() {
        return this.dialog.visible;
    }

    onEdit() {
        this.dialogHeader = this.editHeader;
        this.editing = this.selected;
        const param = this.core.getEditParam(this.selected);
        this.dialog.showDialog(param);
    }

    onNew() {
        this.dialogHeader = this.createHeader;
        this.editing = this.create();
        const param = this.core.getCreateParam();
        this.dialog.showDialog(param);
    }

    save(param: any) {
        this.core.save(param, this.editing);
        this.selected = this.editing;
    }
}
