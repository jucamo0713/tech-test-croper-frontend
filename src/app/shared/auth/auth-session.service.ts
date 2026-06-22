import { Injectable, inject } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { APP_CONFIG } from '../../core/config';
import { AppError } from '../../core/errors';
import { AuthTokenStorageService } from './auth-token-storage.service';

const REFRESH_URI = '/auth/refresh';
const MAX_TIMEOUT_MS = 2_147_483_647;

export interface SessionTokens {
  readonly sessionToken: string;
  readonly refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  private readonly config = inject(APP_CONFIG);
  private readonly tokens = inject(AuthTokenStorageService);
  private readonly refreshClient = axios.create({
    baseURL: this.config.apiBaseUrl,
    timeout: this.config.requestTimeoutMs,
  });

  private refreshTimer: ReturnType<typeof setTimeout> | null = null;
  private refreshInFlight: Promise<string | null> | null = null;

  startAutoRefresh(): void {
    this.scheduleRefresh(this.tokens.getSessionToken());
  }

  setSession(session: SessionTokens): void {
    this.tokens.setTokens(session.sessionToken, session.refreshToken);
    this.scheduleRefresh(session.sessionToken);
  }

  clearSession(): void {
    this.clearRefreshTimer();
    this.tokens.clear();
  }

  getSessionToken(): string | null {
    return this.tokens.getSessionToken();
  }

  async ensureFreshSessionToken(): Promise<string | null> {
    const sessionToken = this.tokens.getSessionToken();

    if (!sessionToken) {
      return null;
    }

    if (
      !this.shouldRefresh(
        sessionToken,
        this.config.accessTokenRequestRefreshBeforeExpirationMs,
      )
    ) {
      return sessionToken;
    }

    return this.refreshSession();
  }

  private scheduleRefresh(sessionToken: string | null): void {
    this.clearRefreshTimer();

    if (!sessionToken) {
      return;
    }

    const expiresAt = this.getTokenExpirationMs(sessionToken);

    if (!expiresAt) {
      return;
    }

    const refreshInMs =
      expiresAt -
      Date.now() -
      this.config.accessTokenAutoRefreshBeforeExpirationMs;

    this.refreshTimer = setTimeout(
      () => {
        void this.refreshSession().catch(() => this.clearSession());
      },
      Math.max(0, Math.min(refreshInMs, MAX_TIMEOUT_MS)),
    );
  }

  private clearRefreshTimer(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  private shouldRefresh(sessionToken: string, thresholdMs: number): boolean {
    const expiresAt = this.getTokenExpirationMs(sessionToken);

    if (!expiresAt) {
      return false;
    }

    return expiresAt - Date.now() <= thresholdMs;
  }

  private async refreshSession(): Promise<string | null> {
    if (this.refreshInFlight) {
      return this.refreshInFlight;
    }

    const refreshToken = this.tokens.getRefreshToken();

    if (!refreshToken) {
      this.clearSession();
      return null;
    }

    this.refreshInFlight = this.requestRefresh(refreshToken)
      .then((session) => {
        this.setSession(session);
        return session.sessionToken;
      })
      .catch((error: unknown) => {
        this.clearSession();
        throw error;
      })
      .finally(() => {
        this.refreshInFlight = null;
      });

    return this.refreshInFlight;
  }

  private async requestRefresh(refreshToken: string): Promise<SessionTokens> {
    try {
      const response = await this.refreshClient.post<SessionTokens>(REFRESH_URI, {
        refreshToken,
      });

      return {
        sessionToken: response.data.sessionToken,
        refreshToken: response.data.refreshToken,
      };
    } catch (error) {
      throw mapRefreshError(error);
    }
  }

  private getTokenExpirationMs(token: string): number | null {
    const [, payload] = token.split('.');

    if (!payload) {
      return null;
    }

    try {
      const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
      const paddedPayload = normalizedPayload.padEnd(
        normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
        '=',
      );
      const decodedPayload = globalThis.atob(paddedPayload);
      const tokenPayload = JSON.parse(decodedPayload) as { exp?: unknown };

      return typeof tokenPayload.exp === 'number' ? tokenPayload.exp * 1000 : null;
    } catch {
      return null;
    }
  }
}

function mapRefreshError(error: unknown): AppError {
  if (!axios.isAxiosError(error)) {
    return {
      kind: 'unknown',
      message: error instanceof Error ? error.message : 'Unexpected error',
      details: error,
    };
  }

  const axiosError = error as AxiosError<{
    httpStatusCode?: number;
    message?: string | string[];
    path?: string;
    requestId?: string;
  }>;
  const responseData = axiosError.response?.data;
  const message = responseData?.message ?? axiosError.message;

  return {
    kind: axiosError.code === 'ECONNABORTED' ? 'timeout' : 'http',
    message: Array.isArray(message) ? message.join(', ') : message,
    statusCode: responseData?.httpStatusCode ?? axiosError.response?.status,
    requestId: responseData?.requestId,
    path: responseData?.path ?? axiosError.config?.url,
    details: responseData ?? error,
  };
}
