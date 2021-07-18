import { getNodeEnv } from './getNodeEnv';
import { getNumberFromEnv } from './utils/env';

const DEFAULT_PORT = 8080;

export function loadConfig() {
  const nodeEnv = getNodeEnv();
  const isDevMode = nodeEnv !== 'production';

  return {
    NODE_ENV: nodeEnv,
    PORT: getNumberFromEnv('PORT', isDevMode ? DEFAULT_PORT : undefined),
  };
}

export type Config = ReturnType<typeof loadConfig>;
