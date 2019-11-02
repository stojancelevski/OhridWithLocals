import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {SecureInnerPagesGuard} from '../shared/guard/secure-inner-pages.guard';
import {HostComponent} from './host/host.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {FirebaseService} from '../firebase.service';

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'become-host', component: HostComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'register-user', component: RegisterComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard]}
];

@NgModule({
  declarations: [
    SignInComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    HostComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    SignInComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  providers: [
    FormBuilder,
    FirebaseService
  ]
})
export class LoginModule {
}
