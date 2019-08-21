import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Status } from 'src/app/iis-mgmt/models/status';
import { Website } from 'src/app/iis-mgmt/models/website';
import { WebSiteService } from 'src/app/iis-mgmt/service/website.service';
import { ListLoaderComponent } from 'src/app/iis-mgmt/shared-components/loaders/list-loader.component';
import { Strings } from 'src/generated/strings';
import { WebsiteEditComponent } from '../general/website-edit.component';

@Component({
  selector: 'iis-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent {
  public readonly strings = MsftSme.resourcesStrings<Strings>();
  private _contents = this.srv.getAll();

  @ViewChild('loader')
  loader: ListLoaderComponent;

  @ViewChild('newSite')
  newSite: WebsiteEditComponent;

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

  canStart(): boolean {
    return this.selected && this.selected.status === Status.Stopped;
  }

  canStop(): boolean {
    return this.selected && this.selected.status === Status.Started;
  }

  editSelection() {
    this.router.navigate([ `website/${this.selected.id}` ]);
  }

  createWebsite() {
  }
}
