import { Component, Input } from '@angular/core';
import { formatF } from 'src/app/iis-mgmt/common/util/string-utils';
import { Binding, Website } from 'src/app/iis-mgmt/models/website';
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

    newBinding() {
        return {
            protocol: 'http',
        };
    }

    get createHeader() {
        return formatF(this.strings.MsftIISWAC.website.binding.createDialogHeader, this.site.name);
    }

    get editHeader() {
        return formatF(this.strings.MsftIISWAC.website.binding.editDialogHeader, this.site.name);
    }

    removeSelected() {
        this.site.bindings.remove(this.selected);
    }
}
