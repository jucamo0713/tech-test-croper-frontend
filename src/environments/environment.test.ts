import { EnvironmentVariables } from '../app/core/config';

export const environment: EnvironmentVariables = {
  NODE_ENV: 'test',
  APP_NAME: 'frontend-test',
  API_BASE_URL: 'http://localhost:3000/api',
  DEFAULT_LOCALE: 'en-US',
  LOG_LEVEL: 'warn',
  DEFAULT_TIMEOUT_MS: 30000,
  ACCESS_TOKEN_AUTO_REFRESH_BEFORE_EXPIRATION_MS: 180000,
  ACCESS_TOKEN_REQUEST_REFRESH_BEFORE_EXPIRATION_MS: 300000,
};
