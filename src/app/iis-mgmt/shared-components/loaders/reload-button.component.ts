import { Component, Input, NgModule } from '@angular/core';

// Note: not used because can't figure out where to put it
@Component({
    selector: 'reload-button',
    template: `
<button class="sme-icon sme-icon-size-xs sme-icon-syncStatusSolid top-right borderless" (click)="reloadFunc()"></button>
`,
    styles: [`
top-right {
    position: absolute;
    top: 0;
    right: 0;
}

.borderless {
    border: 0px;
}
`],
})
export class ReloadButtonComponent {
    @Input()
    reloadFunc: () => {};
}

@NgModule({
    declarations: [
        ReloadButtonComponent,
    ],
    exports: [
        ReloadButtonComponent,
    ],
})
export class Module { }
