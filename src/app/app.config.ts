import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import {
  LoginCommandHandler,
  RegisterCommandHandler,
} from './contexts/auth/application/handlers/auth-command.handlers';
import { AuthEffects } from './contexts/auth/auth.effects';
import { authReducer } from './contexts/auth/auth.reducer';
import { AUTH_FEATURE_KEY } from './contexts/auth/auth.store';
import {
  CreateProductCommandHandler,
  DeleteProductCommandHandler,
  LoadProductDetailQueryHandler,
  LoadProductsQueryHandler,
  UpdateProductCommandHandler,
} from './contexts/products/application/handlers/products.handlers';
import { ProductsEffects } from './contexts/products/products.effects';
import { productsReducer } from './contexts/products/products.reducer';
import { PRODUCTS_FEATURE_KEY } from './contexts/products/products.store';
import { APP_CONFIG, appConfigFromEnvironment } from './core/config';
import { COMMAND_HANDLERS, QUERY_HANDLERS } from './core/cqrs';
import {
  AUTH_TOKEN_READER,
  authTokenInterceptor,
  errorInterceptor,
  requestIdInterceptor,
  timeoutInterceptor,
} from './core/http';
import { provideAppI18n } from './core/i18n';
import { AuthSessionService } from './shared/auth';
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
    provideState(AUTH_FEATURE_KEY, authReducer),
    provideState(PRODUCTS_FEATURE_KEY, productsReducer),
    provideEffects([AppEffects, AuthEffects, ProductsEffects]),
    LoginCommandHandler,
    RegisterCommandHandler,
    LoadProductsQueryHandler,
    LoadProductDetailQueryHandler,
    CreateProductCommandHandler,
    UpdateProductCommandHandler,
    DeleteProductCommandHandler,
    { provide: COMMAND_HANDLERS, useExisting: LoginCommandHandler, multi: true },
    {
      provide: COMMAND_HANDLERS,
      useExisting: RegisterCommandHandler,
      multi: true,
    },
    {
      provide: QUERY_HANDLERS,
      useExisting: LoadProductsQueryHandler,
      multi: true,
    },
    {
      provide: QUERY_HANDLERS,
      useExisting: LoadProductDetailQueryHandler,
      multi: true,
    },
    {
      provide: COMMAND_HANDLERS,
      useExisting: CreateProductCommandHandler,
      multi: true,
    },
    {
      provide: COMMAND_HANDLERS,
      useExisting: UpdateProductCommandHandler,
      multi: true,
    },
    {
      provide: COMMAND_HANDLERS,
      useExisting: DeleteProductCommandHandler,
      multi: true,
    },
    {
      provide: AUTH_TOKEN_READER,
      useFactory: () => {
        const session = inject(AuthSessionService);
        return () => session.getSessionToken();
      },
    },
    provideStoreDevtools({
      maxAge: 25,
      name: 'Frontend Architecture Store',
    }),
  ]
};
