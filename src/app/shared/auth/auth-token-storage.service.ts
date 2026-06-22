import { Injectable } from '@angular/core';

const SESSION_TOKEN_KEY = 'croper.sessionToken';
const REFRESH_TOKEN_KEY = 'croper.refreshToken';

@Injectable({ providedIn: 'root' })
export class AuthTokenStorageService {
  getSessionToken(): string | null {
    return globalThis.localStorage?.getItem(SESSION_TOKEN_KEY) ?? null;
  }

  getRefreshToken(): string | null {
    return globalThis.localStorage?.getItem(REFRESH_TOKEN_KEY) ?? null;
  }

  setTokens(sessionToken: string, refreshToken: string): void {
    globalThis.localStorage?.setItem(SESSION_TOKEN_KEY, sessionToken);
    globalThis.localStorage?.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  clear(): void {
    globalThis.localStorage?.removeItem(SESSION_TOKEN_KEY);
    globalThis.localStorage?.removeItem(REFRESH_TOKEN_KEY);
  }
}

