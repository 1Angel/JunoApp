import { computed, inject } from '@angular/core';
import { RedirectCommand, Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/AuthService';
import { catchError, map, of } from 'rxjs';

export  const  authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.CurrentUser().pipe(
    map((user)=> {
      authService.setAuthentication(user);
      return true;
    }),
    catchError(()=> of(router.parseUrl('auth/login')))
  );

};
