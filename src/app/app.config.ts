import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideLibraryConfig } from './transitions-helper/models/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { mockInterceptor } from './guards/interceptors/mock-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([mockInterceptor])),
    provideLibraryConfig({
      authEndpoint: '/users/authenticate',
      initialPage: '/'})
  ]
};
