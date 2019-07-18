import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { ApplicationPool } from '../../models/app-pool';

@Component({
  selector: 'iis-app-pool-annotation',
  templateUrl: './app-pool-annotation.component.html',
  styleUrls: ['./app-pool-annotation.component.css']
})
export class AppPoolAnnotationComponent {
  @Input() appPool: ApplicationPool;
}

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    AppPoolAnnotationComponent
  ],
  declarations: [
    AppPoolAnnotationComponent,
  ]
})
export class Module {}
