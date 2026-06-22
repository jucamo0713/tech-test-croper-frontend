import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthState, initialAuthState } from './auth.store';

export const authReducer = createReducer<AuthState>(
  initialAuthState,
  on(AuthActions.loginRequested, AuthActions.registerRequested, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.authSucceeded, (state, { session }) => ({
    ...state,
    token: session.sessionToken,
    refreshToken: session.refreshToken,
    user: session.user,
    authenticated: true,
    loading: false,
    error: null,
  })),
  on(AuthActions.authFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message,
  })),
  on(AuthActions.authRequestFinished, (state) => ({
    ...state,
    loading: false,
  })),
  on(AuthActions.logout, () => initialAuthState),
);
