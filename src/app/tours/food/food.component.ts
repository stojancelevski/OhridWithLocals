import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {Tour} from '../../interfaces/tour';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  tours: Tour[];

  constructor(public fireService: FirebaseService) {
  }

  ngOnInit() {
    this.fireService.getToursList().subscribe(tours => {
      this.tours = tours.filter(tour => tour.typeOfTour === 'food');
    });
  }

}
