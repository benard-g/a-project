import { getFromEnv, getNumberFromEnv } from './utils/env';
import { getDatabaseUri } from './getDatabaseUri';
import { getLogLevelFromEnv } from './getLogLevelFromEnv';
import { getNodeEnv } from './getNodeEnv';

const DEFAULT_ACCESS_TOKEN_DURATION = 7 * 24 * 3600; // 1 week
const DEFAULT_GRAPHQL_SCHEMA_GENERATION_PATH = '../../schema.graphql';
const DEFAULT_JWT_SECRET_KEY = 'jwt-secret-key';
const DEFAULT_PORT = 8080;

export function loadConfig() {
  const nodeEnv = getNodeEnv();
  const isDevMode = nodeEnv !== 'production';

  return {
    ACCESS_TOKEN_DURATION: getNumberFromEnv(
      'ACCESS_TOKEN_DURATION',
      isDevMode ? DEFAULT_ACCESS_TOKEN_DURATION : undefined,
    ),
    DATABASE_URL: getDatabaseUri(nodeEnv),
    GRAPHQL_SCHEMA_GENERATION_PATH: getFromEnv(
      'GRAPHQL_SCHEMA_GENERATION_PATH',
      DEFAULT_GRAPHQL_SCHEMA_GENERATION_PATH,
    ),
    JWT_SECRET_KEY: getFromEnv(
      'JWT_SECRET_KEY',
      isDevMode ? DEFAULT_JWT_SECRET_KEY : undefined,
    ),
    LOG_LEVEL: getLogLevelFromEnv(),
    NODE_ENV: nodeEnv,
    PORT: getNumberFromEnv('PORT', isDevMode ? DEFAULT_PORT : undefined),
  } as const;
}

export type Config = ReturnType<typeof loadConfig>;
