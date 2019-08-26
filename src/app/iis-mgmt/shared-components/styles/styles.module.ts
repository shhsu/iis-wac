import { CommonModule } from '@angular/common';
import { Directive, HostBinding, Input, NgModule, OnInit } from '@angular/core';

@Directive({
    selector: '[iis-attention]',
})
export class AttentionDirective implements OnInit {
    @HostBinding('class.sme-icon') icon = false;
    @HostBinding('class.sme-color-error') color = false;
    @HostBinding('class.sme-icon-criticalErrorSolid') iconClass = false;
    @HostBinding('title') title = null;

    @Input('iis-attention')
    attention: string;

    ngOnInit(): void {
        if (this.attention) {
            this.icon = true;
            this.iconClass = true;
            this.color = true;
        }
        this.title = this.attention;
    }
}

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        AttentionDirective,
    ],
    exports: [
        AttentionDirective,
    ],
})
export class IISStylesModule {

}
