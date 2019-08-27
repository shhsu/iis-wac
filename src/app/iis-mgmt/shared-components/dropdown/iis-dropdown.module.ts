import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownModule } from '@msft-sme/angular';
import { IISEnumDropdownComponent } from './iis-enum-dropdown.component';

@NgModule({
    imports: [
        CommonModule,
        DropdownModule,
    ],
    exports: [
        IISEnumDropdownComponent,
    ],
    declarations: [
        IISEnumDropdownComponent,
    ],
})
export class IISDropdownModule { }
