import { HttpInterceptorFn } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { AuthSessionService } from '../../../shared/auth';

export const AUTH_TOKEN_READER = new InjectionToken<() => string | null>(
  'AUTH_TOKEN_READER',
  {
    factory: () => () => null,
  },
);

export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const session = inject(AuthSessionService);
  const readToken = inject(AUTH_TOKEN_READER);

  if (isPublicAuthRequest(request.url)) {
    return next(request);
  }

  return from(session.ensureFreshSessionToken()).pipe(
    switchMap((freshToken) => {
      const token = freshToken ?? readToken();

      if (!token) {
        return next(request);
      }

      return next(
        request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
    }),
  );
};

function isPublicAuthRequest(url: string): boolean {
  return ['/auth/login', '/auth/register', '/auth/refresh'].some((path) =>
    url.endsWith(path),
  );
}
