import {Component, OnInit} from '@angular/core';
import {Tour} from '../../interfaces/tour';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {AuthService} from '../../services/auth/auth.service';
import {Reservation} from '../../interfaces/reservation';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './day-trips.component.html',
  styleUrls: ['./day-trips.component.css']
})
export class DayTripsComponent implements OnInit {
  tours: Tour[];
  filteredUsers: any;
  hosts: any;
  hostName: string;
  users: any;
  reservations: Reservation[];
  reservationButton = false;
  allReservations: Reservation[];
  host: boolean;


  constructor(public fireService: FirebaseService,
              public authService: AuthService,
              public userService: UserService) {
  }

  ngOnInit() {
    this.getTour();
    this.getHosts();
    this.getUsers();

    if (this.userService.loggedInUser !== undefined && this.userService.loggedInUser !== null) {
      this.getReservations();
      if (this.userService.loggedInUser.host === true) {
        this.host = false;
      } else {
        this.host = true;
      }
    }
    this.getAllReservations();
  }

  getUsers() {
    this.fireService.getUsersList().subscribe(users => {
      this.users = users;
    });
  }

  getTour() {
    this.fireService.getToursList().subscribe(tours => {
      this.tours = tours.filter(tour => tour.typeOfTour === 'day');
    });
  }

  filterHost(key: any) {
    if (this.hosts !== undefined) {
      this.hostName = this.hosts.find(x => x.key === key);
      return this.hostName;
    }
  }

  getHosts() {
    this.fireService.getHostsList().subscribe(hosts => {
      this.hosts = hosts;
    });
  }

  filterReservations(tourKey) {
    if (this.allReservations !== undefined) {
      const reservations = this.allReservations.filter(reservation => reservation.tourId === tourKey);
      return reservations.length;
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
    });
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
      reservationFromTour.forEach(match => {
        const customObj = this.users.filter(user => user.key === match.userId);
        this.filteredUsers.push(customObj);
      });
    });
  }

  reserve(key) {
    this.fireService.createReservation({tourId: key, userId: this.userService.loggedInUser.key});
  }
}
