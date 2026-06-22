import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { AuthTokenStorageService } from '../../../../shared/auth';
import { selectAuthenticated } from '../../auth.selectors';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const tokens = inject(AuthTokenStorageService);

  if (tokens.getSessionToken()) {
    return true;
  }

  return store.select(selectAuthenticated).pipe(
    take(1),
    map((authenticated) => authenticated || router.createUrlTree(['/login'])),
  );
};

