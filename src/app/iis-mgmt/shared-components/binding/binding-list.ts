import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

@Component({
    selector: 'binding-list',
    template: `
<div>bunch of bindings</div>
`,
})
export class BindingListComponent {
}

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        BindingListComponent,
    ],
    exports: [
        BindingListComponent,
    ],
})
export class BindingsModule {
}
