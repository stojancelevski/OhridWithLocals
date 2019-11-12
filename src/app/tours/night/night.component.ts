import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {Tour} from '../../interfaces/tour';

@Component({
  selector: 'app-night',
  templateUrl: './night.component.html',
  styleUrls: ['./night.component.css']
})
export class NightComponent implements OnInit {
  tours: Tour[];

  constructor(public fireService: FirebaseService) {
  }

  ngOnInit() {
    this.fireService.getToursList().subscribe(tours => {
      this.tours = tours.filter(tour => tour.typeOfTour === 'night');
    });
  }

}
