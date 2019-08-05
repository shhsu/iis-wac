import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSiteService } from '../service/website.service';
import { LoaderComponent } from '../shared-components/loaders/loader.component';

@Component({
  selector: 'iis-website-general',
  templateUrl: './website-general.component.html',
  styleUrls: ['./website-general.component.css']
})
export class WebsiteGeneralComponent {
  @ViewChild('loader')
  loader: LoaderComponent;

  private _content = this.srv.fromRoute(this.route);

  constructor(
    private route: ActivatedRoute,
    private srv: WebSiteService,
  ) { }

  get content() {
    return this._content;
  }

  get website() {
    return this.loader.items[0];
  }
}
