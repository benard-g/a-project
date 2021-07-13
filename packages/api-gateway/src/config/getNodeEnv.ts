import { getFromEnv } from './utils/env';

export type NodeEnv = 'production' | 'development' | 'test';

export function getNodeEnv(): NodeEnv {
  const nodeEnv = getFromEnv('NODE_ENV', null);

  switch (nodeEnv) {
    case 'production':
      return 'production';
    case 'test':
      return 'test';
    default:
      return 'development';
  }
}
