import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ToastrService } from 'ngx-toastr';

export const routes: Routes = [
  {
    path: 'ahorcado',
    loadComponent: () =>
      import('./juegos/ahorcado/ahorcado.component')
        .then((m) => m.AhorcadoComponent)
        .catch(),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'mayoromenor',
    loadComponent: () =>
      import('./juegos/mayoromenor/mayoromenor.component')
        .then((m) => m.MayoromenorComponent)
        .catch(),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'preguntados',
    loadComponent: () =>
      import('./juegos/preguntados/preguntados.component')
        .then((m) => m.PreguntadosComponent)
        .catch(),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'mijuego',
    loadComponent: () =>
      import('./juegos/mijuego/mijuego.component')
        .then((m) => m.MijuegoComponent)
        .catch(),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
];

export default routes;
