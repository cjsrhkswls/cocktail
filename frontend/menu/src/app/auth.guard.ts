import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isLoggedin()){
    return true;
  }

  router.navigate(['/login']);
  return false;
};

export const adminAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isAdminLoggedin()){
    return true;
  }

  router.navigate(['/home']);
  return false;
}
