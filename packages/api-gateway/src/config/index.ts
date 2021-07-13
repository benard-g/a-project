import { getNodeEnv } from './getNodeEnv';

export function loadConfig() {
  const nodeEnv = getNodeEnv();

  return {
    NODE_ENV: nodeEnv,
  };
}

export type Config = ReturnType<typeof loadConfig>;
