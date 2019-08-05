import { Component } from '@angular/core';
import { NavigationTitle } from '@microsoft/windows-admin-center-sdk/angular';

// @dynamic
@Component({
  selector: 'app-webserver-general',
  templateUrl: './webserver-general.component.html',
  styleUrls: ['./webserver-general.component.css']
})
@NavigationTitle({
  getTitle: () => 'Web Server General'
})
export class WebserverGeneralComponent {
}
