import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import * as firebase from 'firebase';
import {Tour} from '../../interfaces/tour';
import {Upload} from '../../interfaces/upload';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  usersRef: AngularFireList<any> = null;
  hostRef: AngularFireList<any> = null;
  tourRef: AngularFireList<any> = null;
  reservationRef: AngularFireList<any> = null;
  private basePath = '/tours';
  private uploadTask: firebase.storage.UploadTask;
  storageTask: any;

  constructor(private database: AngularFireDatabase, private route: Router) {
    this.usersRef = database.list('/users');
    this.hostRef = database.list('/hosts');
    this.tourRef = database.list('/tours');
    this.reservationRef = database.list('/reservations');
  }

  createReservation(value) {
    this.reservationRef.push(value);
  }

  createUser(value) {
    this.usersRef.push(value);
  }

  createHost(value) {
    this.hostRef.push(value);
  }

  createTour(value: Tour, upload: Upload): void {
    const storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${value.title}`).put(upload.file);
    this.storageTask = storageRef.child(`${this.basePath}/${value.title}`);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        window.alert(error);
      },
      () => {
        // upload success
        this.storageTask.getDownloadURL().then(url => {
          value.url = url;
          this.tourRef.push(value);
          this.route.navigate(['home']);
        });
      }
    )
    ;
  }

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

  getReservations(): AngularFireList<any> {
    return this.reservationRef;
  }

  deleteReservation(key: string): Promise<void> {
    return this.reservationRef.remove(key);
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

  getReservationsList(): Observable<any> {
    return this.getReservations().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    );
  }
}
