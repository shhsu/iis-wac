import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';
import { WebSiteService } from 'src/app/iis-mgmt/service/data/website.service';
import { LoaderComponent } from 'src/app/iis-mgmt/shared-components/loaders/loader.component';
import { Strings } from 'src/generated/strings';

@Component({
  selector: 'iis-website-general',
  templateUrl: './website-general.component.html'
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
    public srv: WebSiteService,
  ) { }

  get content() {
    return this._content;
  }
}
