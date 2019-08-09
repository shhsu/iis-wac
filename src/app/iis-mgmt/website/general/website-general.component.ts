import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';
import { Strings } from 'src/generated/strings';
import { Status } from '../../models/status';
import { Website } from '../../models/website';
import { WebSiteService } from '../../service/website.service';
import { LoaderComponent } from '../../shared-components/loaders/loader.component';

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
    return this.website.status === Status.Stopped;
  }

  canStop() {
    return this.website.status === Status.Started;
  }

  get content() {
    return this._content;
  }

  get website(): Website {
    return this.loader.items[0];
  }
}
