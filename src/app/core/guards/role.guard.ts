import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Rol } from '../config/menu';

export const roleGuard = (permitidos: Rol[]): CanActivateFn => () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (permitidos.includes(auth.rol())) return true;
  return router.parseUrl('/dashboard');
};