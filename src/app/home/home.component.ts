import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../services/firebase/firebase.service';
import {AuthService} from '../services/auth/auth.service';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {UserService} from '../services/user/user.service';
import {SignInComponent} from '../login/sign-in/sign-in.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  host: boolean;


  constructor(private authService: AuthService,
              public userService: UserService,
  ) {
  }

  ngOnInit() {
    if (this.userService.loggedInUser !== undefined && this.userService.loggedInUser !== null) {
      console.log(this.userService.loggedInUser);
      if (this.userService.loggedInUser.host === true) {
        this.host = false;
      } else {
        this.host = true;
      }
    }
  }

}
