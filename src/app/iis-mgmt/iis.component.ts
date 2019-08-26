import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';
import { Strings } from 'src/generated/strings';
import { PowershellService } from './service/data/powershell.service';

@Component({
  selector: 'iis-component',
  templateUrl: './iis.component.html'
})
export class IISComponent implements OnInit {
  public readonly strings = MsftSme.resourcesStrings<Strings>();

  public static navigationTitle(
    _: AppContextService,
    __: ActivatedRouteSnapshot,
  ): string {
    return 'IIS';
  }

  constructor(
    private ps: PowershellService,
  ) {
  }

  public ngOnInit() {
    this.ps.createSession();
  }
}
