import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApplicationPool, ProcessModel } from 'src/app/iis-mgmt/models/app-pool';
import { FormEditMode } from 'src/app/iis-mgmt/shared-components/form/iis-form.component';
import { Strings } from 'src/generated/strings';

export function newAppPool(name: string = null): ApplicationPool {
    const pool = new ApplicationPool();
    pool.name = name;
    pool.processModel = new ProcessModel();
    return pool;
}

@Component({
    selector: 'iis-app-pool-edit',
    templateUrl: 'app-pool-edit.component.html'
})
export class AppPoolEditComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    editMode: FormEditMode;

    @Input()
    pool: ApplicationPool = newAppPool();

    @Output()
    exited = new EventEmitter<boolean>();
}
