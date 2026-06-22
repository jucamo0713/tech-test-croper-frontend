import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, from, map, of, tap } from 'rxjs';
import { ErrorMapper } from '../../core/errors';
import { AuthSessionService } from '../../shared/auth';
import { AuthRepository } from './infrastructure/repositories/auth.repository';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly repository = inject(AuthRepository);
  private readonly session = inject(AuthSessionService);
  private readonly router = inject(Router);

  readonly login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequested),
      exhaustMap(({ email, password }) =>
        from(this.repository.login(email, password)).pipe(
          map((session) => AuthActions.authSucceeded({ session })),
          catchError((error: unknown) =>
            of(AuthActions.authFailed({ error: ErrorMapper.fromUnknown(error) })),
          ),
          finalize(() => this.store.dispatch(AuthActions.authRequestFinished())),
        ),
      ),
    ),
  );

  readonly register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerRequested),
      exhaustMap(({ email, password }) =>
        from(this.repository.register(email, password)).pipe(
          map((session) => AuthActions.authSucceeded({ session })),
          catchError((error: unknown) =>
            of(AuthActions.authFailed({ error: ErrorMapper.fromUnknown(error) })),
          ),
          finalize(() => this.store.dispatch(AuthActions.authRequestFinished())),
        ),
      ),
    ),
  );

  readonly persistSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authSucceeded),
        tap(({ session }) => {
          this.session.setSession(session);
          void this.router.navigate(['/products']);
        }),
      ),
    { dispatch: false },
  );

  readonly logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.session.clearSession();
          void this.router.navigate(['/login']);
        }),
      ),
    { dispatch: false },
  );
}
