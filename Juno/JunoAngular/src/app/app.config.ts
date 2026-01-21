import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './common/Interceptors/Auth-interceptor';
import { AuthService } from './common/Services/AuthService';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAppInitializer(()=> {
      const service = inject(AuthService);
      service.CurrentUser().subscribe((res)=>{
        service.setAuthentication(res)
      });
    }),
    provideRouter(routes),
  ]
};
