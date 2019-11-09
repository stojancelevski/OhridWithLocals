import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css']
})
export class CreateTourComponent implements OnInit {
  tourForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.tourForm = this.fb.group({

      }
    );
  }

}
