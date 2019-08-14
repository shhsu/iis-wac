import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '@msft-sme/angular';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Status } from 'src/app/iis-mgmt/models/status';
import { Website } from 'src/app/iis-mgmt/models/website';
import { WebSiteService } from 'src/app/iis-mgmt/service/website.service';
import { ListLoaderComponent } from 'src/app/iis-mgmt/shared-components/loaders/list-loader.component';
import { Strings } from 'src/generated/strings';
import { DialogInfo } from '../../shared-components/dialog/create-dialog.component';

@Component({
  selector: 'iis-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent {
  public readonly strings = MsftSme.resourcesStrings<Strings>();
  private _contents = this.srv.getAll();
  public dummy = of(1);
  @ViewChild('loader')
  loader: ListLoaderComponent;

  constructor(
    private router: Router,
    private srv: WebSiteService,
  ) {}

  get contents(): Observable<Website> {
    return this._contents;
  }

  get selected(): Website {
    if (this.loader) {
      return this.loader.selected;
    }
  }

  set selected(site: Website) {
    if (this.loader) {
      this.loader.selected = site;
    }
  }

  getName(site: Website): string {
    return site.name;
  }

  canStart(): boolean {
    return this.selected && this.selected.status === Status.Stopped;
  }

  canStop(): boolean {
    return this.selected && this.selected.status === Status.Started;
  }

  editSelection() {
    this.router.navigate([ `website/${this.selected.id}` ]);
  }

  createWebsite(site: Website) {

  }
}
