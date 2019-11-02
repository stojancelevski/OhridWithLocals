import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Array<any>;

  constructor(public firebaseService: FirebaseService,
              private router: Router) {
  }

  ngOnInit() {
    this.firebaseService.getUsers().subscribe(value => {
      value.map(item => {
        console.log(item.payload.doc.data());
      });
    });
  }

}
