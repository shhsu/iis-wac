import { Component, Input, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableComponent } from '@msft-sme/angular';
import { Observable } from 'rxjs';
import { ApplicationPool } from 'src/app/iis-mgmt/models/app-pool';
import { AppPoolService } from 'src/app/iis-mgmt/service/data/app-pool.service';
import { IISDialogComponent } from 'src/app/iis-mgmt/shared-components/dialog/iis-dialog.component';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'iis-app-pool-list',
    templateUrl: 'app-pool-list.component.html',
})
export class AppPoolListComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();
    private _contents = this.srv.getAll();

    @Input()
    select: [string, any];

    @Input()
    pickerMode: boolean;

    @ViewChild('dataTable')
    dataTable: DataTableComponent;

    @ViewChild('createDialog')
    createDialog: IISDialogComponent<any>;

    constructor(
        private router: Router,
        public srv: AppPoolService,
    ) { }

    get contents(): Observable<ApplicationPool> {
        return this._contents;
    }

    get selected(): ApplicationPool {
        return this.dataTable.selection;
    }

    showDialog = () => {
        this.createDialog.showAsync(null);
    }

    removeAppPools = (pools: ApplicationPool[]) => {
    }

    editSelection = (pool: ApplicationPool) => {
        this.router.navigate([`app-pool/${encodeURI(pool.name)}`]);
    }

    createAppPool() {
    }
}
