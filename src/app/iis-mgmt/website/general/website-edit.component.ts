import { Component, Input, OnInit } from '@angular/core';
import { Website } from 'src/app/iis-mgmt/models/website';
import { Strings } from 'src/generated/strings';

@Component({
    selector: 'iis-website-edit',
    templateUrl: './website-edit.component.html',
})
export class WebsiteEditComponent implements OnInit {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    @Input()
    site: Website;

    ngOnInit() {
        if (!this.site) {
        this.site = <Website> {
            name: 'new website'
        };
        }
    }
}
