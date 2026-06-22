import { EnvironmentVariables } from '../app/core/config';

export const environment: EnvironmentVariables = {
  NODE_ENV: 'production',
  APP_NAME: 'frontend',
  API_BASE_URL: '/api',
  DEFAULT_LOCALE: 'en-US',
  LOG_LEVEL: 'error',
  DEFAULT_TIMEOUT_MS: 30000,
  ACCESS_TOKEN_AUTO_REFRESH_BEFORE_EXPIRATION_MS: 180000,
  ACCESS_TOKEN_REQUEST_REFRESH_BEFORE_EXPIRATION_MS: 300000,
};
