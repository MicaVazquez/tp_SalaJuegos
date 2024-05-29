import { Injectable, effect, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from '../interfaces/log';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  mail = signal<string | null>(null);

  private logsCollection: AngularFirestoreCollection<Log>;
  logs: Observable<Log[]>;

  constructor(private firestore: AngularFirestore) {
    this.logsCollection = this.firestore.collection<Log>('logs');
    this.logs = this.logsCollection.valueChanges();
  }

  agregarLog(log: Log) {
    return this.logsCollection.add(log);
  }
}
