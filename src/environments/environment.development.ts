import { EnvironmentVariables } from '../app/core/config';

export const environment: EnvironmentVariables = {
  NODE_ENV: 'development',
  APP_NAME: 'frontend',
  API_BASE_URL: '/api',
  DEFAULT_LOCALE: 'en-US',
  LOG_LEVEL: 'debug',
  DEFAULT_TIMEOUT_MS: 30000,
};
