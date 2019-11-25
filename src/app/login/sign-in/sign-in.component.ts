import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  user: any;

  constructor(public authService: AuthService,
              public fb: FormBuilder,
              private router: Router,
              public firebaseService: FirebaseService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      typeOfSigh: [false]
    });
  }

  get loginFormControls() {
    return this.loginForm.value;
  }

  loginAsHost() {
    this.getHosts(this.loginFormControls.email);
    setTimeout(() => {
      if (this.userService.loggedInUser !== undefined && this.userService.loggedInUser !== null) {
        this.authService.SignIn(this.loginFormControls.email, this.loginFormControls.password).then(() => {
            this.authService.isLoggedIn = true;
            this.router.navigate(['home']);
          }
        ).catch(err => {
          this.userService.loggedInUser = null;
          window.alert(err);
        });
      } else {
        this.loginForm.reset();
        window.alert('Your status is not matched with our records please login again');
      }
    }, 1000);
  }

  loginAsUser() {
    this.getUsers(this.loginFormControls.email);
    setTimeout(() => {
      if (this.userService.loggedInUser !== undefined && this.userService.loggedInUser !== null) {
        this.authService.SignIn(this.loginFormControls.email, this.loginFormControls.password).then(() => {
            this.authService.isLoggedIn = true;
            this.router.navigate(['home']);
          }
        ).catch(err => {
          this.userService.loggedInUser = null;
          window.alert(err);
        });
      } else {
        this.loginForm.reset();
        window.alert('Your status is not matched with our records please login with your correct status user/host');
      }
    }, 1000);

  }

  getUsers(email: string) {
    this.firebaseService.getUsersList().subscribe(users => {
      const user = users.find(x => x.email === email);
      this.userService.loggedInUser = user;
    });
  }

  getHosts(email: string) {
    this.firebaseService.getHostsList().subscribe(users => {
      const user = users.find(x => x.email === email);
      this.userService.loggedInUser = user;
    });
  }

}
