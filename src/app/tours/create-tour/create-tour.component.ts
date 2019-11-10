import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {FirebaseService} from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css']
})
export class CreateTourComponent implements OnInit {
  tourForm: FormGroup;

  constructor(private fb: FormBuilder,
              private user: UserService,
              private fireService: FirebaseService) {
  }

  ngOnInit() {
    this.tourForm = this.fb.group({
        title: ['', Validators.required],
        place: [this.user.loggedInUser.place, Validators.required],
        hostId: [this.user.loggedInUser.key],
        time: ['', Validators.required],
        duration: ['', Validators.required],
        typeOfTour: ['', Validators.required]
      }
    );
  }

  get tourFormControls() {
    return this.tourForm.value;
  }

  createTour() {
    console.log(this.tourFormControls);
    this.fireService.createTour(this.tourFormControls);
  }

}
