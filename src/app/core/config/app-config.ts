import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';
import { validateEnvironment } from './env.validation';

export interface AppConfig {
  readonly appName: string;
  readonly apiBaseUrl: string;
  readonly defaultLocale: string;
  readonly logLevel: string;
  readonly nodeEnv: string;
  readonly requestTimeoutMs: number;
  readonly accessTokenAutoRefreshBeforeExpirationMs: number;
  readonly accessTokenRequestRefreshBeforeExpirationMs: number;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

const env = validateEnvironment(environment);

export const appConfigFromEnvironment: AppConfig = {
  appName: env.APP_NAME,
  apiBaseUrl: env.API_BASE_URL,
  defaultLocale: env.DEFAULT_LOCALE,
  logLevel: env.LOG_LEVEL,
  nodeEnv: env.NODE_ENV,
  requestTimeoutMs: env.DEFAULT_TIMEOUT_MS,
  accessTokenAutoRefreshBeforeExpirationMs:
    env.ACCESS_TOKEN_AUTO_REFRESH_BEFORE_EXPIRATION_MS,
  accessTokenRequestRefreshBeforeExpirationMs:
    env.ACCESS_TOKEN_REQUEST_REFRESH_BEFORE_EXPIRATION_MS,
};
