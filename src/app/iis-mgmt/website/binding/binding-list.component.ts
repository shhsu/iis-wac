import { Component, Input, ViewChild } from '@angular/core';
import { Binding, Website } from 'src/app/iis-mgmt/models/website';
import { IISDialogComponent } from 'src/app/iis-mgmt/shared-components/dialog/iis-dialog.component';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'binding-list',
    templateUrl: './binding-list.component.html',
})
export class BindingListComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    site: Website;

    @ViewChild('editDialog')
    editDialog: IISDialogComponent;

    selected: Binding;
    dialogHeader: string;

    createNew() {
        // this.dialogHeader = `${this.strings.MsftIISWAC.website.binding.createDialogHeader} ${this.site.name}`;
        this.editDialog.showDialog();
    }

    editSelected() {
        // this.dialogHeader = `${this.strings.MsftIISWAC.website.binding.editDialogHeader} ${this.site.name}`;
        this.editDialog.showDialog();
    }

    saveEdits() {
    }
}
