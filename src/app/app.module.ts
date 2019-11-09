import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginModule} from './login/login.module';
import {AuthService} from './services/auth/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseService} from './services/firebase/firebase.service';
import { HomeJumbotronComponent } from './home-jumbotron/home-jumbotron.component';
import { CreateTourComponent } from './tours/create-tour/create-tour.component';
import {ToursModule} from './tours/tours.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    HomeJumbotronComponent,
    CreateTourComponent
  ],
  imports: [
    LoginModule,
    ToursModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [
    AuthService,
    AngularFireAuth,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
