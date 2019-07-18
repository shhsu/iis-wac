import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonSettingsNavigationItem } from '@microsoft/windows-admin-center-sdk/angular';

export abstract class SettingsComponent implements OnInit {
    constructor(
        private anchor: any,
        private route: ActivatedRoute,
        private router: Router,
        public settingItems: CommonSettingsNavigationItem[],
    ) {
    }

    ngOnInit() {
        if (this.route.component === this.anchor) {
            this.router.navigate([ 'general'], {
                relativeTo: this.route,
            });
        }
    }
}
