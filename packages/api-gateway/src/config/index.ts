import { getFromEnv, getNumberFromEnv } from './utils/env';
import { getDatabaseUri } from './getDatabaseUri';
import { getNodeEnv } from './getNodeEnv';

const DEFAULT_ACCESS_TOKEN_DURATION = 7 * 24 * 3600; // 1 week
const DEFAULT_ALLOWED_CORS_ORIGIN = '*';
const DEFAULT_GRAPHQL_SCHEMA_GENERATION_PATH = '../../schema.graphql';
const DEFAULT_JWT_SECRET_KEY = 'jwt-secret-key';
const DEFAULT_LOG_LEVEL = 'debug';
const DEFAULT_PORT = 8080;

export function loadConfig() {
  const nodeEnv = getNodeEnv();

  return {
    ACCESS_TOKEN_DURATION: getNumberFromEnv(
      'ACCESS_TOKEN_DURATION',
      nodeEnv !== 'production' ? DEFAULT_ACCESS_TOKEN_DURATION : undefined,
    ),
    ALLOWED_CORS_ORIGIN: getFromEnv(
      'ALLOWED_CORS_ORIGIN',
      nodeEnv !== 'production' ? DEFAULT_ALLOWED_CORS_ORIGIN : undefined,
    ),
    DATABASE_URL: getDatabaseUri(nodeEnv),
    GRAPHQL_SCHEMA_GENERATION_PATH:
      nodeEnv === 'development'
        ? getFromEnv(
            'GRAPHQL_SCHEMA_GENERATION_PATH',
            DEFAULT_GRAPHQL_SCHEMA_GENERATION_PATH,
          )
        : false,
    JWT_SECRET_KEY: getFromEnv(
      'JWT_SECRET_KEY',
      nodeEnv !== 'production' ? DEFAULT_JWT_SECRET_KEY : undefined,
    ),
    LOG_LEVEL: getFromEnv('LOG_LEVEL', DEFAULT_LOG_LEVEL),
    NODE_ENV: nodeEnv,
    PORT: getNumberFromEnv(
      'PORT',
      nodeEnv !== 'production' ? DEFAULT_PORT : undefined,
    ),
  } as const;
}

export type Config = ReturnType<typeof loadConfig>;
