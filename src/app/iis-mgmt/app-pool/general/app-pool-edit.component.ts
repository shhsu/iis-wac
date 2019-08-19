import { Component } from '@angular/core';
import { ApplicationPool } from 'src/app/iis-mgmt/models/app-pool';

@Component({
    selector: 'iis-app-pool-edit',
    templateUrl: 'app-pool-edit.component.html'
})
export class AppPoolEditComponent {
    pool: ApplicationPool;
}
