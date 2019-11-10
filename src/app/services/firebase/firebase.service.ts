import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {User} from '../../interfaces/user';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {concat, merge, Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  usersRef: AngularFireList<any> = null;
  hostRef: AngularFireList<any> = null;
  tourRef: AngularFireList<any> = null;

  constructor(private database: AngularFireDatabase) {
    this.usersRef = database.list('/users');
    this.hostRef = database.list('/hosts');
    this.tourRef = database.list('/tours');
  }


  createUser(value) {
    this.usersRef.push(value);
  }

  createHost(value) {
    this.hostRef.push(value);
  }

  createTour(value) {
    this.tourRef.push(value);
  }

  searchTour(field, value) {
    return this.tourRef.query.orderByChild(field).equalTo(value);
  }
  searchHost()

  // Return an observable list with optional query
  getUsers(): AngularFireList<any> {
    return this.usersRef;
  }

  getHosts(): AngularFireList<any> {
    return this.hostRef;
  }
  getTours(): AngularFireList<any> {
    return this.tourRef;
  }

  getUsersList(): Observable<any> {
    return this.getUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    );
  }

  getHostsList(): Observable<any> {
    return this.getHosts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    );
  }
  getToursList(): Observable<any> {
    return this.getTours().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    );
  }
}
