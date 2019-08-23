import { AfterViewInit, Component, ContentChildren, QueryList, ViewChild } from '@angular/core';
import { ActionBarComponent } from '@msft-sme/angular';
import { Observable } from 'rxjs';

// tslint:disable-next-line: interface-name
export interface IISAction {
    readonly text: string;
    readonly iconClass: string;
    isEnabled(): boolean;
    execute(): Observable<any>;
}

export abstract class IISActionsController {
    abstract get actions(): IISAction[];
}

@Component({
    selector: 'iis-actions',
    template: `
<sme-action-bar #actionBar class="sme-position-flex-none">
    <sme-action-button #action *ngFor="let a of actions" [text]="a.text"
        [iconClass]="a.iconClass" [enabled]="isEnabled(a)" (execute)="execute(a)">
    </sme-action-button>
</sme-action-bar>
`,
})
export class IISActionsComponent implements AfterViewInit {
    actions: IISAction[];

    @ViewChild('actionBar')
    actionBar: ActionBarComponent;

    @ContentChildren('actionBarController')
    controllers: QueryList<IISActionsController>;

    ngAfterViewInit(): void {
        this.actions = Array.prototype.concat(...this.controllers.map(c => c.actions));
        this.actionBar.onActionItemChanged();
    }

    isEnabled(a: IISAction) {
        // TODO: disable everything when something is working?
        return a.isEnabled();
    }

    execute(a: IISAction) {
        // TODO: show loading?
        a.execute().subscribe(
            _ => { },
            _ => { },
            () => { },
        );
    }
}
