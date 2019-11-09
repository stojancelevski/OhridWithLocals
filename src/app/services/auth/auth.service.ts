import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  loggedUser: any;
  isLoggedIn = false;

  constructor(public afAuth: AngularFireAuth, // Inject Firebase auth service
              public router: Router,
  ) {

  }


  // Sign in with email/password
  SignIn(email, password) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          resolve(result);
        }).catch((error) => {
        reject(error);
      });
    });
  }

  // Sign up with email/password
  SignUp(email, password) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          resolve(result);
        }).catch((error) => {
        reject(error);
      });
    });
  }


  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }


}
