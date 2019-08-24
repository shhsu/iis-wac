import { CommonModule } from '@angular/common';
import { Directive, HostBinding, Input, NgModule, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[showError]',
})
export class ShowErrorDirective implements OnInit {
    @HostBinding('class.sme-icon') icon = false;
    @HostBinding('class.sme-color-error') color = false;
    @HostBinding('class.sme-icon-criticalErrorSolid') iconClass = false;
    @HostBinding('title') title = null;

    private host: any;

    @Input()
    showError: string;

    ngOnInit(): void {
        const errorMsg = this.host[this.showError];
        if (errorMsg) {
            this.icon = true;
            this.iconClass = true;
            this.color = true;
        }
        this.title = errorMsg;
    }
}

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ShowErrorDirective,
    ],
    exports: [
        ShowErrorDirective,
    ],
})
export class IISStylesModule {

}
