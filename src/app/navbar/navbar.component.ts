import {Component} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService: AuthService,
              private router: Router,
              public user: UserService) {

  }


  logOut(): void {
    this.authService.loggedUser = null;
    this.authService.isLoggedIn = false;
    this.user.user = null;
    this.router.navigate(['/home']);
  }
}
