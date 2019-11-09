import {Injectable} from '@angular/core';
import {User} from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user?: User;

  get loggedInUser(): User {
    return this.user;
  }

  set loggedInUser(user: User) {

    this.user = user;
  }
}
