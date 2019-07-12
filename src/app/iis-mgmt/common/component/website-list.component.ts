import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PowershellService } from 'src/app/iis-mgmt/common/service/powershell.service';
import { Status } from 'src/app/iis-mgmt/models/status';
import { convert, WebSite } from 'src/app/iis-mgmt/models/website';
import { PowerShellScripts } from 'src/generated/powershell-scripts';
import { ListComponent } from './list.component';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent extends ListComponent<WebSite> {
  constructor(
    private ps: PowershellService,
  ) {
    super();
  }

  get contents(): Observable<WebSite> {
    return this.ps.get(PowerShellScripts.Iis.Get_WebSite).pipe(map(convert));
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
}
