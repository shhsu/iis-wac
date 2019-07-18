import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Status } from 'src/app/iis-mgmt/models/status';
import { WebSite } from 'src/app/iis-mgmt/models/website';
import { WebSiteService } from 'src/app/iis-mgmt/service/website.service';
import { ListComponent } from '../generic/list.component';

@Component({
  selector: 'iis-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent extends ListComponent<WebSite> {
  constructor(
    private router: Router,
    private srv: WebSiteService,
  ) {
    super();
  }

  get contents(): Observable<WebSite> {
    return this.srv.getAll();
  }

  getName(site: WebSite): string {
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
}
