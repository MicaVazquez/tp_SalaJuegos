import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../clases/user';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;
  usuarios: Observable<User[]>;

  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection<User>('usuarios');
    this.usuarios = this.usersCollection.valueChanges();
  }

  getUsers(): Observable<User[]> {
    return this.usersCollection.valueChanges();
  }

  agregarUser(user: User) {
    return this.usersCollection.add(user);
  }
}
