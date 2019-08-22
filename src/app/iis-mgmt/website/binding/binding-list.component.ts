import { Component, Input, ViewChild } from '@angular/core';
import { formatF } from 'src/app/iis-mgmt/common/util/string-utils';
import { Binding, Website } from 'src/app/iis-mgmt/models/website';
import { IISDialogComponent } from 'src/app/iis-mgmt/shared-components/dialog/iis-dialog.component';
import { Strings } from 'src/generated/strings';
import { BindingComponent } from './binding.component';

@Component({
    selector: 'binding-list',
    templateUrl: './binding-list.component.html',
})
export class BindingListComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    site: Website;

    @ViewChild('editDialog')
    editDialog: IISDialogComponent<Binding>;

    @ViewChild('bindingEdit')
    editor: BindingComponent;

    selected: Binding;
    dialogHeader: string;

    get editing() {
        if (this.editor) {
            return this.editor.binding;
        }
        return null;
    }

    set editing(v: Binding) {
        if (this.editor) {
            this.editor.binding = v;
        }
    }

    newBinding() {
        return {
            protocol: 'http',
        };
    }

    createHeader() {
        return formatF(this.strings.MsftIISWAC.website.binding.createDialogHeader, this.site.name);
    }

    editHeader() {
        return formatF(this.strings.MsftIISWAC.website.binding.editDialogHeader, this.site.name);
    }

    removeSelected() {
        this.site.bindings.remove(this.selected);
    }
}
