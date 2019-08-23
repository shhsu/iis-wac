import { Component, Input } from '@angular/core';
import { DataTableComponent } from '@msft-sme/angular';
import { Observable, of } from 'rxjs';
import { Strings } from 'src/generated/strings';
import { IISActionsController } from './iis-actions.component';

function isSingle(items: any) {
    // Potential SME bug: what of the data item was an array?
    return !Array.isArray(items);
}

@Component({
    selector: 'control-table',
    template: '',   //  couldn't get it to work as directive because the directive object was not selected
})
export class IISTableActionsComponent extends IISActionsController {
    public readonly strings = MsftSme.resourcesStrings<Strings>();
    @Input()
    private table: DataTableComponent;

    @Input() addTableItem: () => void;
    @Input() editTableItem: (item: any) => void;
    @Input() deleteTableItems: (items: any[]) => Observable<any>;

    get actions() {
        return [
            {
                text: this.strings.MsftIISWAC.common.list.add,
                iconClass: 'sme-icon sme-icon-add',
                isEnabled: () => this.canAdd(),
                execute: () => of(this.addTableItem()),
            },
            {
                text: this.strings.MsftIISWAC.common.list.remove,
                iconClass: 'sme-icon sme-icon-remove',
                isEnabled: () => this.canRemove(),
                execute: () => this.deleteItems(),
            },
            {
                text: this.strings.MsftIISWAC.common.list.edit,
                iconClass: 'sme-icon sme-icon-edit',
                isEnabled: () => this.canEdit(),
                execute: () => of(this.editTableItem(this.table.selection)),
            },
        ];
    }


    canAdd(): boolean {
        return !!this.table;
    }

    canEdit(): boolean {
        return this.table && this.table.selection && isSingle(this.table.selection);
    }

    canRemove(): boolean {
        return this.table && this.table.selection;
    }

    deleteItems() {
        let deleting = this.table.selection;
        if (isSingle(deleting)) {
            deleting = [deleting];
        }
        return this.deleteTableItems(deleting);
    }
}
