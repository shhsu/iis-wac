import { Component, Input } from '@angular/core';
import { ApplicationPool } from 'src/app/iis-mgmt/models/app-pool';
import { FormEditMode } from 'src/app/iis-mgmt/shared-components/form/iis-form.component';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'iis-app-pool-edit',
    templateUrl: 'app-pool-edit.component.html'
})
export class AppPoolEditComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    editMode: FormEditMode;

    @Input()
    pool: ApplicationPool;
}
