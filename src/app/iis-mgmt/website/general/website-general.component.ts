import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';
import { Status } from 'src/app/iis-mgmt/models/status';
import { WebSiteService } from 'src/app/iis-mgmt/service/website.service';
import { LoaderComponent } from 'src/app/iis-mgmt/shared-components/loaders/loader.component';
import { Strings } from 'src/generated/strings';

@Component({
  selector: 'iis-website-general',
  templateUrl: './website-general.component.html',
  styleUrls: ['./website-general.component.css']
})
export class WebsiteGeneralComponent {
  public readonly strings = MsftSme.resourcesStrings<Strings>();

  @ViewChild('loader')
  loader: LoaderComponent;

  private _content = this.srv.fromRoute(this.route);

  public static navigationTitle(_: AppContextService, __: ActivatedRouteSnapshot): string {
    return 'general';
  }

  constructor(
    private route: ActivatedRoute,
    private srv: WebSiteService,
  ) { }

  canStart() {
    return this.loader.item.status === Status.Stopped;
  }

  canStop() {
    return this.loader.item.status === Status.Started;
  }

  get content() {
    return this._content;
  }
}
