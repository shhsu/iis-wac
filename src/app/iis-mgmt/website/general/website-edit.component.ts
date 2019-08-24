import { Component, Input } from '@angular/core';
import { Website } from 'src/app/iis-mgmt/models/website';
import { FormEditMode } from 'src/app/iis-mgmt/shared-components/form/iis-form.component';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'iis-website-edit',
    templateUrl: './website-edit.component.html',
})
export class WebsiteEditComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    editMode: FormEditMode;

    @Input()
    site: Website = <Website>{
        name: this.strings.MsftIISWAC.website.newName,
        bindings: [],
        applicationPoolName: ' ',   // work around an SME bug where the action btn is disabled if field is empty
    };

    onLayoutChanged() {
    }
}
