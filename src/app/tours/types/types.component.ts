import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {

  constructor(private route: Router) {
  }

  ngOnInit() {
  }

  navigateToPage(type: string) {
    this.route.navigate([type]);
  }

}
