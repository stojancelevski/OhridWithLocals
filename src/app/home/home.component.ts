import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase/firebase.service';
import {AuthService} from '../services/auth/auth.service';
import {UserService} from '../services/user/user.service';
import {Tour} from '../interfaces/tour';
import {Reservation} from '../interfaces/reservation';
import {Router} from '@angular/router';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hosts: any;
  filteredUsers: any;
  allReservations: Reservation[];
  users: any;
  hostName: string;
  host: boolean;
  tours: Tour[];
  reservations: Reservation[];
  reservationButton = false;

  constructor(private authService: AuthService,
              public userService: UserService,
              private fireService: FirebaseService,
              private router: Router) {
  }

  ngOnInit() {
    this.getTour();
    this.getHosts();
    this.getUsers();
    if (this.userService.loggedInUser !== undefined && this.userService.loggedInUser !== null) {
      this.getReservations();
      console.log(this.userService.loggedInUser);
      if (this.userService.loggedInUser.host === true) {
        this.host = false;
      } else {
        this.host = true;
      }
    }
    this.getAllReservations();
  }

  reserve(key) {
    this.fireService.createReservation({tourId: key, userId: this.userService.loggedInUser.key});
  }

  getUsers() {
    this.fireService.getUsersList().subscribe(users => {
      this.users = users;
    });
  }

  getTour() {
    this.fireService.getToursList().subscribe(tours => {
      this.tours = tours;
    });
  }

  getHosts() {
    this.fireService.getHostsList().subscribe(hosts => {
      this.hosts = hosts;
    });
  }

  filterHost(key: any) {
    if (this.hosts !== undefined) {
      this.hostName = this.hosts.find(x => x.key === key);
      return this.hostName;
    }
  }

  getReservations() {
    this.fireService.getReservationsList().subscribe(reservations => {
      this.reservations = reservations.filter(reservation =>
        reservation.userId === this.userService.loggedInUser.key
      );

    });
  }

  getAllReservations() {
    this.fireService.getReservationsList().subscribe(reservations => {
      this.allReservations = reservations;
      console.log(this.allReservations);
    });
  }

  filterReservations(tourKey) {
    if (this.allReservations !== undefined) {
      const reservations = this.allReservations.filter(reservation => reservation.tourId === tourKey);
      return reservations.length;
    }
  }

  checkReservation(tourKey) {
    if (this.reservations !== undefined) {
      const match = this.reservations.find(reservation => reservation.tourId === tourKey);
      if (match !== undefined) {
        this.reservationButton = false;
      } else {
        this.reservationButton = true;
      }
    }
  }

  deleteReservation(tourKey) {
    const match = this.reservations.find(reservation => reservation.tourId === tourKey);
    if (match !== undefined) {
      this.fireService.deleteReservation(match.key);
    }
  }

  viewReservations(tourKey) {
    this.filteredUsers = new Array(0);
    this.fireService.getReservationsList().subscribe(reseravtions => {
      const reservationFromTour = reseravtions.filter(reservation => reservation.tourId === tourKey);
      console.log(reservationFromTour);
      reservationFromTour.forEach(match => {
        const customObj = this.users.filter(user => user.key === match.userId);
        this.filteredUsers.push(customObj);
      });
    });
    console.log(this.filteredUsers);
  }

  test() {
    if (this.authService.isLoggedIn === false || this.host === false) {
      console.log('only for host');
    }
  }

}
