import { Component, Input, ViewChild } from '@angular/core';
import { DataTableComponent } from '@msft-sme/angular';
import { IISDialogComponent } from 'src/app/iis-mgmt/shared-components/dialog/iis-dialog.component';
import { FormEditMode, IISFormComponent } from 'src/app/iis-mgmt/shared-components/form/iis-form.component';
import { Strings } from 'src/generated/strings';

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
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    create: () => T;

    @Input()
    createHeader: string;

    @Input()
    editHeader: string;

    @Input()
    selected: T;

    @ViewChild('form')
    form: IISFormComponent;

    input: T;
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
        return this.form.item;
    }

    get editable() {
        return this.selected;
    }

    get visible() {
        return this.dialog.visible;
    }

    onEdit() {
        this.dialogHeader = this.editHeader;
        this.input = this.selected;
        this.editMode = FormEditMode.Existing;
        const param = this.core.getEditParam(this.selected);
        this.dialog.showAsync(param);
    }

    onNew() {
        this.dialogHeader = this.createHeader;
        this.input = this.create();
        this.editMode = FormEditMode.New;
        const param = this.core.getCreateParam();
        this.dialog.showAsync(param);
    }

    save(param: any) {
        this.core.save(param, this.editing);
        this.selected = this.editing;
    }
}
