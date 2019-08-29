import { Component, Input, ViewChild } from '@angular/core';
import { formatF } from 'src/app/iis-mgmt/common/util/string-utils';
import { Binding, IPEndPoint, Protocol, protocolNames, Website } from 'src/app/iis-mgmt/models/website';
import { IISCollectionDialogComponent } from 'src/app/iis-mgmt/shared-components/dialog/iis-collection-dialog.component';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'binding-list',
    templateUrl: './binding-list.component.html',
})
export class BindingListComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    selected: Binding;

    @Input()
    site: Website;

    @ViewChild('dialog')
    dialog: IISCollectionDialogComponent<Binding>;

    newBinding() {
        const result = new Binding();
        result.protocol = protocolNames[Protocol.HTTP];
        result.endPoint = new IPEndPoint();
        return result;
    }

    get createHeader() {
        return formatF(this.strings.MsftIISWAC.website.binding.createDialogHeader, this.site.name);
    }

    get editHeader() {
        return formatF(this.strings.MsftIISWAC.website.binding.editDialogHeader, this.site.name);
    }

    showEdit = () => {
        this.dialog.onEdit();
    }

    showNew = () => {
        this.dialog.onNew();
    }

    removeSelected = () => {
        this.site.bindings.remove(this.selected);
    }
}
