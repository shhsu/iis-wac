import { NgModule } from '@angular/core';
import { AuthenticationComponent } from './authentication.component';
import { AuthorizationComponent } from './authorization.component';
import { NotImplementedComponent } from './not-implemented.component';

@NgModule({
    declarations: [
        AuthenticationComponent,
        NotImplementedComponent,
        AuthorizationComponent,
    ],
})
export class ConfigurationsModule {}
