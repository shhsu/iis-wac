import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { enumerateEnum } from 'src/app/iis-mgmt/common/util/serialization';

@Component({
    selector: 'iis-enum-dropdown',
    templateUrl: './iis-enum-dropdown.component.html',
    // TODO: refactor to common style: dropbox a:hover
    styles: [`
a:hover {
    text-decoration: underline;
}
`],
})
export class IISEnumDropdownComponent implements OnInit {
    @Input()
    label: string;

    @Input()
    type: {};

    @Input()
    values: number[];

    @Input()
    friendly: string[];

    @Input()
    selected: number;

    @Output()
    selectedChange = new EventEmitter<number>();

    ngOnInit() {
        if (!this.values) {
            this.values = Array.from(enumerateEnum(this.type));
        }
    }

    onClick(value: number) {
        this.selected = value;
        this.selectedChange.emit(value);
    }
}
