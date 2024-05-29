import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authF: AngularFireAuth) {}

  userCredentials: any = null;

  async register(email: string, password: string) {
    const response = await this.authF.createUserWithEmailAndPassword(
      email,
      password
    );

    this.userCredentials = response.user;
    console.log(this.userCredentials);
  }

  login(email: string, password: string) {
    return this.authF.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.authF.signOut();
  }

  obtenerUsuarioLogueado() {
    return this.authF.authState;
  }

  obtenerDatosUsuario() {
    return this.authF.currentUser;
  }
}
