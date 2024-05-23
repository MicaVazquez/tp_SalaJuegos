import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { IMensaje } from '../clases/mensaje';

@Injectable({
  providedIn: 'root',
})
export class MensajeService {
  constructor(private firestore: AngularFirestore) {}

  agregarMsj(msj: IMensaje) {
    this.firestore.collection('mensajes').add(msj);
  }

  getMensajesOrdenadosPorFecha(): Observable<any[]> {
    return this.firestore
      .collection('mensajes', (ref) => ref.orderBy('fecha'))
      .valueChanges();
  }
}
