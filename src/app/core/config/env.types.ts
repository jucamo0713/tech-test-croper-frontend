export type NodeEnvironment = 'development' | 'test' | 'production';

export type LogLevel = 'error' | 'warn' | 'log' | 'debug' | 'verbose';

export interface EnvironmentVariables {
  NODE_ENV: NodeEnvironment;
  APP_NAME: string;
  API_BASE_URL: string;
  DEFAULT_LOCALE: string;
  LOG_LEVEL: LogLevel;
  DEFAULT_TIMEOUT_MS: number;
  ACCESS_TOKEN_AUTO_REFRESH_BEFORE_EXPIRATION_MS: number;
  ACCESS_TOKEN_REQUEST_REFRESH_BEFORE_EXPIRATION_MS: number;
}
