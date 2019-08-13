import { Component, Input, NgModule } from '@angular/core';
import { AppContextService } from '@msft-sme/angular';
import { Binding, Website } from '../models/website';

export class NavigatorService {
    constructor(
        private appContext: AppContextService,
    ) {
    }

    SitePrefix(site: Website) {

    }
}

@Component({
    template: `
<div></div>
`,
})
export class NavigatorComponent {
    @Input()
    private binding: Binding[];

    @Input()
    private prefix: string;

    constructor(
    ) {
    }
}

@NgModule({
    declarations: [
        NavigatorComponent,
    ],
    exports: [
        NavigatorComponent,
    ],
    providers: [
        NavigatorService,
    ]
})
export class Module {
}
