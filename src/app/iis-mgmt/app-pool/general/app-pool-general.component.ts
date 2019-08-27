
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';
import { AppPoolService } from 'src/app/iis-mgmt/service/data/app-pool.service';
import { LoaderComponent } from 'src/app/iis-mgmt/shared-components/loaders/loader.component';

@Component({
    templateUrl: './app-pool-general.component.html',
})
export class AppPoolGeneralComponent {
    @ViewChild('loader')
    loader: LoaderComponent;

    private _content = this.srv.fromRoute(this.route);

    public static navigationTitle(_: AppContextService, __: ActivatedRouteSnapshot): string {
        return 'general';
    }

    constructor(
        private route: ActivatedRoute,
        public srv: AppPoolService,
    ) { }

    get content() {
        return this._content;
    }
}
