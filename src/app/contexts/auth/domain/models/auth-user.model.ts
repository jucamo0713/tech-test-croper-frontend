export interface AuthUser {
  readonly userId: string;
  readonly email: string;
  readonly status?: string;
}

export interface AuthSession {
  readonly user: AuthUser;
  readonly sessionToken: string;
  readonly refreshToken: string;
}

