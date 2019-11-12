import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {Tour} from '../../interfaces/tour';

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent implements OnInit {
  tours: Tour[];

  constructor(public fireService: FirebaseService) {
  }

  ngOnInit() {
    this.fireService.getToursList().subscribe(tours => {
      this.tours = tours.filter(tour => tour.typeOfTour === 'adventure');
    });
  }

}
