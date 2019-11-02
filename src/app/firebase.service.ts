import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFirestore) {
  }


  createUser(value) {
    return this.db.collection('users').add({
      name: value.name,
      surname: value.surname,
      email: value.email,
      host: value.host
    });
  }

  getUsers() {
    return this.db.collection('users').snapshotChanges();
  }
}
