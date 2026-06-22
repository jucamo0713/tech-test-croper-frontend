import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { APP_CONFIG, appConfigFromEnvironment } from './core/config';
import {
  authTokenInterceptor,
  errorInterceptor,
  requestIdInterceptor,
  timeoutInterceptor,
} from './core/http';
import { provideAppI18n } from './core/i18n';
import { AppEffects, appReducers } from './shared/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: APP_CONFIG, useValue: appConfigFromEnvironment },
    provideAppI18n(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        requestIdInterceptor,
        authTokenInterceptor,
        timeoutInterceptor,
        errorInterceptor,
      ]),
    ),
    provideStore(appReducers),
    provideEffects([AppEffects]),
    provideStoreDevtools({
      maxAge: 25,
      name: 'Frontend Architecture Store',
    }),
  ]
};
