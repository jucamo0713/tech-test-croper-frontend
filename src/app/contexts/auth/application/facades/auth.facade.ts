import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { ErrorMapper } from '../../../../core/errors';
import { CqrsCallerService } from '../../../../core/cqrs';
import { AuthTokenStorageService } from '../../../../shared/auth';
import {
  selectAuthenticated,
  selectAuthError,
  selectAuthLoading,
  selectAuthUser,
} from '../../auth.selectors';
import { AuthActions } from '../../auth.actions';
import { LoginCommand, RegisterCommand } from '../commands';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);
  private readonly cqrs = inject(CqrsCallerService);
  private readonly tokens = inject(AuthTokenStorageService);

  readonly user$ = this.store.select(selectAuthUser);
  readonly authenticated$ = this.store
    .select(selectAuthenticated)
    .pipe(map((authenticated) => authenticated || Boolean(this.tokens.getSessionToken())));
  readonly loading$ = this.store.select(selectAuthLoading);
  readonly error$ = this.store.select(selectAuthError);

  login(email: string, password: string): void {
    this.cqrs.dispatch(new LoginCommand(email, password)).subscribe({
      error: (error: unknown) =>
        this.store.dispatch(
          AuthActions.authFailed({ error: ErrorMapper.fromUnknown(error) }),
        ),
    });
  }

  register(email: string, password: string): void {
    this.cqrs.dispatch(new RegisterCommand(email, password)).subscribe({
      error: (error: unknown) =>
        this.store.dispatch(
          AuthActions.authFailed({ error: ErrorMapper.fromUnknown(error) }),
        ),
    });
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
