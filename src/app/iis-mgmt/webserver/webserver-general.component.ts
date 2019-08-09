import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

// @dynamic
@Component({
  selector: 'app-webserver-general',
  templateUrl: './webserver-general.component.html',
})
@NavigationTitle({
  getTitle: () => 'Web Server General'
})
export class WebserverGeneralComponent {
}
