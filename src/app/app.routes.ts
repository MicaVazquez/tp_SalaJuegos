import { Routes } from '@angular/router';

import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
    ...canActivate(() => redirectLoggedInTo(['/home'])),
  },
  {
    path: 'presentacion',
    loadComponent: () =>
      import('./components/presentacion/presentacion.component').then(
        (m) => m.PresentacionComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./components/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
    ...canActivate(() => redirectLoggedInTo(['/home'])),
  },
  {
    path: 'ahorcado',
    loadComponent: () =>
      import('./components/juegos/ahorcado/ahorcado.component').then(
        (m) => m.AhorcadoComponent
      ),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'mayoromenor',
    loadComponent: () =>
      import('./components/juegos/mayoromenor/mayoromenor.component').then(
        (m) => m.MayoromenorComponent
      ),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'preguntados',
    loadComponent: () =>
      import('./components/juegos/preguntados/preguntados.component').then(
        (m) => m.PreguntadosComponent
      ),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'mijuego',
    loadComponent: () =>
      import('./components/juegos/mijuego/mijuego.component').then(
        (m) => m.MijuegoComponent
      ),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
];
