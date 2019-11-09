import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {HostComponent} from './host/host.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {FirebaseService} from '../services/firebase/firebase.service';
import {AngularFireDatabase} from '@angular/fire/database';

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'become-host', component: HostComponent},
  {path: 'register-user', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email-address', component: VerifyEmailComponent}
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
    FirebaseService,
    AngularFireDatabase,
  ]
})
export class LoginModule {
}
