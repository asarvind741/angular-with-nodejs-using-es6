import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth-routing.module';
import { ToastrModule } from 'ngx-toastr';
import {VerificationComponent} from './verify/verify.component';
import {LoginComponent} from './login/login.component';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AuthComponent,
    VerificationComponent,
    LoginComponent
  ],
  providers: [
    NoAuthGuard
  ]
})
export class AuthModule {}
