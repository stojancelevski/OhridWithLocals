import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {HostComponent} from './host/host.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {FirebaseService} from '../services/firebase/firebase.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'become-host', component: HostComponent},
  {path: 'register-user', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent}
];

@NgModule({
  declarations: [
    SignInComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    HostComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    SignInComponent,
    RegisterComponent,
    ForgotPasswordComponent,
  ],
  providers: [
    FormBuilder,
    FirebaseService,
    AngularFireDatabase,
  ]
})
export class LoginModule {
}
