import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppContextService, NavigationService } from '@msft-sme/angular';

@Component({
    selector: 'sme-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy, OnInit {
    constructor(
        private appContext: AppContextService,
        private navigationService: NavigationService,
    ) {}

    public ngOnInit(): void {
        this.appContext.ngInit({ navigationService: this.navigationService });
    }

    public ngOnDestroy() {
        this.appContext.ngDestroy();
    }
}
