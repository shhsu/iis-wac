import { Component, Input } from '@angular/core';
import { Binding } from 'src/app/iis-mgmt/models/website';

@Component({
    selector: 'iis-binding',
    templateUrl: './binding.component.html',
})
export class BindingComponent {
    @Input()
    binding: Binding;
}
