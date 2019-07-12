import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';
import { WACComponent } from 'src/app/iis-mgmt/common/component/wac-component';
import { PowershellService } from './common/service/powershell.service';

@Component({
  selector: 'iis-component',
  templateUrl: './iis.component.html',
  styleUrls: ['./iis.component.css']
})
export class IISComponent extends WACComponent implements OnInit {
  public static navigationTitle(
    _: AppContextService,
    __: ActivatedRouteSnapshot,
  ): string {
    return 'IIS';
  }

  constructor(
    // private sme: AppContextService,
    private ps: PowershellService,
  ) {
    super();
  }

  public ngOnInit() {
    this.ps.createSession();
  }

}
