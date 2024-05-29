import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const logueadoGuard: CanActivateFn = (route, state) => {
  const authS = inject(AuthService);

  return true;
};
