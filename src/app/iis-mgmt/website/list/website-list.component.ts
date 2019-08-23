import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Website } from 'src/app/iis-mgmt/models/website';
import { WebSiteService } from 'src/app/iis-mgmt/service/website.service';
import { IISDialogComponent } from 'src/app/iis-mgmt/shared-components/dialog/iis-dialog.component';
import { WebsiteEditComponent } from 'src/app/iis-mgmt/website/general/website-edit.component';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'iis-website-list',
    templateUrl: './website-list.component.html'
})
export class WebsiteListComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();
    private _contents = this.srv.getAll();

    @ViewChild('newSite')
    newSite: WebsiteEditComponent;

    @ViewChild('createDialog')
    createDialog: IISDialogComponent<any>;

    constructor(
        private router: Router,
        public srv: WebSiteService,
    ) { }

    get contents(): Observable<Website> {
        return this._contents;
    }

    showDialog = () => {
        this.createDialog.showDialog(null);
    }

    editWebsite = (selected: Website) => {
        this.router.navigate([`website/${selected.id}`]);
    }

    removeWebsites = (_: Website[]) => {
        return of(null);
    }

    saveWebsite() {
        // TODO: save the website in editor
    }
}
