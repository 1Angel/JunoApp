import { computed, inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/AuthService';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  const isAuthenticated = computed(()=> authService.isLoggedIn());

  if(!isAuthenticated()){
    router.navigateByUrl('/auth/login');
    return false;
  }
  return true;




};
