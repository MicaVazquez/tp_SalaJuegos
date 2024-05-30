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
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
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
    path: 'juegos',
    loadChildren: () => import('./components/juegos.routes').catch(),
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
