import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
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
  },
  {
    path: 'ahorcado',
    loadComponent: () =>
      import('./components/juegos/ahorcado/ahorcado.component').then(
        (m) => m.AhorcadoComponent
      ),
  },
  {
    path: 'mayoromenor',
    loadComponent: () =>
      import('./components/juegos/mayoromenor/mayoromenor.component').then(
        (m) => m.MayoromenorComponent
      ),
  },
  {
    path: 'preguntados',
    loadComponent: () =>
      import('./components/juegos/preguntados/preguntados.component').then(
        (m) => m.PreguntadosComponent
      ),
  },
  {
    path: 'mijuego',
    loadComponent: () =>
      import('./components/juegos/mijuego/mijuego.component').then(
        (m) => m.MijuegoComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
];
