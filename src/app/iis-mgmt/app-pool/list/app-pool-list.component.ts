import { Component, Input, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationPool } from 'src/app/iis-mgmt/models/app-pool';
import { Status } from 'src/app/iis-mgmt/models/status';
import { AppPoolService } from 'src/app/iis-mgmt/service/app-pool.service';
import { ListLoaderComponent } from 'src/app/iis-mgmt/shared-components/loaders/list-loader.component';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'iis-app-pool-list',
    templateUrl: 'app-pool-list.component.html',
})
export class AppPoolListComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();
    private _contents = this.srv.getAll();

    @Input()
    select: [string, any];

    @ViewChild('loader')
    loader: ListLoaderComponent;

    constructor(
      private router: Router,
      private srv: AppPoolService,
    ) {}

    get contents(): Observable<ApplicationPool> {
      return this._contents;
    }

    get selected(): ApplicationPool {
      if (this.loader) {
        return this.loader.selected;
      }
    }

    set selected(pool: ApplicationPool) {
      if (this.loader) {
        this.loader.selected = pool;
      }
    }

    canStart(): boolean {
      return this.selected && this.selected.status === Status.Stopped;
    }

    canStop(): boolean {
      return this.selected && this.selected.status === Status.Started;
    }

    editSelection() {
      this.router.navigate([ `app-pool/${this.selected.id}` ]);
    }

    createAppPool(pool: ApplicationPool) {
    }
}
