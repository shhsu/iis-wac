import { Component, Input, ViewChild } from '@angular/core';
import { AppPoolEditComponent, newAppPool } from 'src/app/iis-mgmt/app-pool/general/app-pool-edit.component';
import { AppPoolListComponent } from 'src/app/iis-mgmt/app-pool/list/app-pool-list.component';
import { formatF } from 'src/app/iis-mgmt/common/util/string-utils';
import { Website } from 'src/app/iis-mgmt/models/website';
import { IISDialogComponent } from 'src/app/iis-mgmt/shared-components/dialog/iis-dialog.component';
import { FormEditMode } from 'src/app/iis-mgmt/shared-components/form/iis-form.component';
import { LoaderComponent } from 'src/app/iis-mgmt/shared-components/loaders/loader.component';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'iis-website-settings',
    templateUrl: './website-settings.component.html',
})
export class WebsiteSettingsComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    site: Website;

    @ViewChild('appPoolEditDialog')
    appPoolEditDialog: IISDialogComponent<any>;

    @ViewChild('appPoolSelect')
    appPoolSelect: AppPoolListComponent;

    @ViewChild('appPoolEdit')
    appPoolEdit: AppPoolEditComponent;

    @ViewChild('appPoolLoader')
    appPoolLoader: LoaderComponent;

    get defaultAppPoolName() {
        return this.site.name || this.strings.MsftIISWAC.common.unnamed;
    }

    get appPoolSelectDialogHeader() {
        return formatF(this.strings.MsftIISWAC.website.selectAppPoolDialogHeader, this.site.name);
    }

    get appPoolEditDialogHeader() {
        return formatF(this.strings.MsftIISWAC.website.editAppPoolDialogHeader,
            this.site.applicationPoolName || this.defaultAppPoolName);
    }

    newAppPool = () => {
        newAppPool(this.defaultAppPoolName);
    }

    get appPoolEditMode() {
        if (this.appPoolLoader.isDefault) {
            return FormEditMode.New;
        } else {
            return FormEditMode.Existing;
        }
    }

    get canEditAppPool(): boolean {
        return !!this.site.applicationPoolName;
    }

    selectAppPool() {
        this.site.applicationPoolName = this.appPoolSelect.selected.name;
    }

    selectAfterEdit() {
        this.site.applicationPoolName = this.appPoolEdit.pool.name;
    }

    editDialogExit(ok: boolean) {
        if (ok) {
            this.selectAfterEdit();
        }
        this.appPoolEditDialog.exit(ok);
    }
}
