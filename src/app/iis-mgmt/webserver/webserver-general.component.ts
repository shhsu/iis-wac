import { Component, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';
import { Strings } from 'src/generated/strings';
import { Status } from '../models/status';
import { WebServerService } from '../service/webserver.service';
import { LoaderComponent } from '../shared-components/loaders/loader.component';

@Component({
  selector: 'app-webserver-general',
  templateUrl: './webserver-general.component.html',
})
export class WebserverGeneralComponent {
  public readonly strings = MsftSme.resourcesStrings<Strings>();

  @ViewChild('loader')
  loader: LoaderComponent;

  public static navigationTitle(_: AppContextService, __: ActivatedRouteSnapshot): string {
    return 'general';
  }

  constructor(
    private srv: WebServerService,
  ) {}

  get content() {
    return this.srv.WebServer;
  }

  get webserver() {
    return this.loader.item;
  }

  canStart(): boolean {
    return this.webserver.status === Status.Stopped;
  }

  canStop(): boolean {
    return this.webserver.status === Status.Started;
  }
}
