import { Component } from '@angular/core';
import { Strings } from 'src/generated/strings';

@Component({
    templateUrl: 'app-pool.component.html',
})
export class AppPoolComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();
}
