import { AuthUser } from './domain/models';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  readonly token: string | null;
  readonly refreshToken: string | null;
  readonly user: AuthUser | null;
  readonly authenticated: boolean;
  readonly loading: boolean;
  readonly error: string | null;
}

export const initialAuthState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
  authenticated: false,
  loading: false,
  error: null,
};

