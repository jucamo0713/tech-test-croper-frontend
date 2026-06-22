import { validateEnvironment } from '../../../../src/app/core/config';
import type { EnvironmentVariables } from '../../../../src/app/core/config';

const validEnvironment: EnvironmentVariables = {
  NODE_ENV: 'test',
  APP_NAME: 'frontend-test',
  API_BASE_URL: '/api',
  DEFAULT_LOCALE: 'en-US',
  LOG_LEVEL: 'warn',
  DEFAULT_TIMEOUT_MS: 30000,
  ACCESS_TOKEN_AUTO_REFRESH_BEFORE_EXPIRATION_MS: 180000,
  ACCESS_TOKEN_REQUEST_REFRESH_BEFORE_EXPIRATION_MS: 300000,
};

describe('validateEnvironment', () => {
  it('returns a valid environment', () => {
    expect(validateEnvironment(validEnvironment)).toEqual(validEnvironment);
  });

  it('rejects an invalid API base URL', () => {
    expect(() =>
      validateEnvironment({
        ...validEnvironment,
        API_BASE_URL: '',
      }),
    ).toThrow('API_BASE_URL');
  });

  it('rejects an invalid timeout', () => {
    expect(() =>
      validateEnvironment({
        ...validEnvironment,
        DEFAULT_TIMEOUT_MS: 0,
      }),
    ).toThrow('DEFAULT_TIMEOUT_MS');
  });

  it('rejects invalid refresh thresholds', () => {
    expect(() =>
      validateEnvironment({
        ...validEnvironment,
        ACCESS_TOKEN_AUTO_REFRESH_BEFORE_EXPIRATION_MS: 0,
      }),
    ).toThrow('ACCESS_TOKEN_AUTO_REFRESH_BEFORE_EXPIRATION_MS');
  });
});
