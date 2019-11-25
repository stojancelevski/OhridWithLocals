import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {Tour} from '../../interfaces/tour';
import {Upload} from '../../interfaces/upload';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css']
})
export class CreateTourComponent implements OnInit {
  tourForm: FormGroup;
  imageURL: string;
  selectedFile: FileList;
  currentUpload: Upload;

  constructor(private fb: FormBuilder,
              private user: UserService,
              private fireService: FirebaseService,
              private router: Router) {
  }

  ngOnInit() {
    // if (this.user.loggedInUser === undefined) {
    //   window.alert('Forbidden Access');
    //   this.router.navigate(['/home']);
    // }
    this.tourForm = this.fb.group({
        title: ['', Validators.required],
        place: [this.user.loggedInUser.place, Validators.required],
        hostId: [this.user.loggedInUser.key],
        time: ['', Validators.required],
        duration: ['', Validators.required],
        maxPeople: ['', Validators.required],
        typeOfTour: ['', Validators.required],
        date: ['', Validators.required]
      }
    );
  }

  get tourFormControls() {
    return this.tourForm.value;
  }

  detectFIles(event) {
    this.selectedFile = event.target.files;
  }

  createTour() {
    let file = this.selectedFile.item(0);
    this.currentUpload = new Upload(file);
    this.fireService.createTour(this.tourFormControls, this.currentUpload);
  }


}
