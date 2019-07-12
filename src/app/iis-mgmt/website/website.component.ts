import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';

// @dynamic
@Component({
  selector: 'iis-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  public static navigationTitle(_: AppContextService, __: ActivatedRouteSnapshot): string {
    return 'website';
  }

  constructor() { }

  ngOnInit() {
  }

}
