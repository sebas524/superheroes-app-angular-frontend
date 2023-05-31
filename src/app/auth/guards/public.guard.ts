import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const publicGuard: CanActivateFn = (route, state) => {
  console.log('publicGuard =>', { route, state });

  const authService = inject(AuthService);
  const router = inject(Router);
  // * if auth status is authenticated then you cannot enter login route
  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigateByUrl('/heroes');
    return false;
  }
  // * only if authStatus !== authenticated then you get access:
  return true;
};
