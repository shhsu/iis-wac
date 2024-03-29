import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Website } from 'src/app/iis-mgmt/models/website';
import { FormEditMode } from 'src/app/iis-mgmt/shared-components/form/iis-form.component';
import { IISFormComponent } from 'src/app/iis-mgmt/shared-components/form/iis-form.component';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'iis-website-edit',
    templateUrl: './website-edit.component.html',
})
export class WebsiteEditComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Output()
    exited = new EventEmitter<boolean>();

    @ViewChild('form')
    form: IISFormComponent;

    @Input()
    editMode: FormEditMode;

    @Input()
    site: Website = <Website>{
        name: this.strings.MsftIISWAC.website.newName,
        bindings: [],
    };
}
