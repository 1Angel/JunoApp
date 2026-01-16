import { HttpErrorResponse, HttpEventType, type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/AuthService';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  let authReq = req.clone({
    credentials: "include"
  });

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if(err.status == 401){
        authService.deleteUserData();
      }
      return throwError(()=> err);
    })
  );
};
