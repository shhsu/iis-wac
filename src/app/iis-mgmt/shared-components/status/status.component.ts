import { Component, Input, NgModule } from '@angular/core';
import { Status } from 'src/app/iis-mgmt/models/status';
import { printStatus } from 'src/app/iis-mgmt/models/status';

@Component({
    selector: 'iis-status',
    templateUrl: './status.component.html'
})
export class StatusComponent {
    @Input() status: Status;
    constructor() { }

    get display(): string {
        return printStatus(this.status);
    }
}

@NgModule({
    declarations: [StatusComponent],
    exports: [StatusComponent],
})
export class StatusModule { }
