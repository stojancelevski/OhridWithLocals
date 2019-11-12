import {Component, OnInit} from '@angular/core';
import {Tour} from '../../interfaces/tour';
import {FirebaseService} from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-view',
  templateUrl: './day-trips.component.html',
  styleUrls: ['./day-trips.component.css']
})
export class DayTripsComponent implements OnInit {
  tours: Tour[];

  constructor(public fireService: FirebaseService) {
  }

  ngOnInit() {
    this.fireService.getToursList().subscribe(tours => {
      this.tours = tours.filter(tour => tour.typeOfTour === 'day');
    });
  }

}
