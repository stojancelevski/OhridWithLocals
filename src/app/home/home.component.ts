import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase/firebase.service';
import {AuthService} from '../services/auth/auth.service';
import {UserService} from '../services/user/user.service';
import {Tour} from '../interfaces/tour';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  host: boolean;
  tours: Tour;

  constructor(private authService: AuthService,
              public userService: UserService,
              private fireService: FirebaseService) {
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
    this.getTour();
  }

  getTour() {
    this.fireService.getToursList().subscribe(tours => {
      this.tours = tours;
    });
  }

}
