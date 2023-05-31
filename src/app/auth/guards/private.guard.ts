import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const privateGuard: CanActivateFn = (route, state) => {
  // * this guard will only worry about protecting the route (its not going to do any http petition or w/e). basically, it will check: if authenticated? come through, if not authenticated? then access denied.
  // * you need to return a true if user is authenticated.
  console.log('privateGuard =>', { route, state });

  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.authStatus() !== AuthStatus.authenticated) {
    router.navigateByUrl('/auth');
    return false;
  }
  // * only if authStatus === authenticated then you get access:
  return true;
};
