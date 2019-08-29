import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingWheelModule } from '@msft-sme/angular';
import { Module as ErrorModule } from './error.component';
import { ContentWrapperComponent, ListLoaderComponent } from './list-loader.component';
import { LoaderComponent } from './loader.component';

@NgModule({
    imports: [
        CommonModule,
        LoadingWheelModule,
        ErrorModule,
    ],
    exports: [
        ListLoaderComponent,
        LoaderComponent,
    ],
    declarations: [
        ListLoaderComponent,
        ContentWrapperComponent,
        LoaderComponent,
    ],
})
export class LoadersModule {
}
