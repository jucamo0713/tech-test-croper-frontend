import { EnvironmentVariables } from '../app/core/config';

export const environment: EnvironmentVariables = {
  NODE_ENV: 'production',
  APP_NAME: 'frontend',
  API_BASE_URL: '/api',
  DEFAULT_LOCALE: 'en-US',
  LOG_LEVEL: 'error',
  DEFAULT_TIMEOUT_MS: 30000,
};
