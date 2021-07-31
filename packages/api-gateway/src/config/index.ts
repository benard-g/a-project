import { getLogLevelFromEnv } from './getLogLevelFromEnv';
import { getNodeEnv } from './getNodeEnv';
import { getFromEnv, getNumberFromEnv } from './utils/env';

const DEFAULT_PORT = 8080;
const DEFAULT_GRAPHQL_SCHEMA_GENERATION_PATH = '../../schema.graphql';

export function loadConfig() {
  const nodeEnv = getNodeEnv();
  const isDevMode = nodeEnv !== 'production';

  return {
    GRAPHQL_SCHEMA_GENERATION_PATH: getFromEnv(
      'GRAPHQL_SCHEMA_GENERATION_PATH',
      DEFAULT_GRAPHQL_SCHEMA_GENERATION_PATH,
    ),
    LOG_LEVEL: getLogLevelFromEnv(),
    NODE_ENV: nodeEnv,
    PORT: getNumberFromEnv('PORT', isDevMode ? DEFAULT_PORT : undefined),
  } as const;
}

export type Config = ReturnType<typeof loadConfig>;
