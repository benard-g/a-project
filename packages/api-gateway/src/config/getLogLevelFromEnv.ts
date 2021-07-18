import { getFromEnv } from './utils/env';

export function getLogLevelFromEnv() {
  const logLevel = getFromEnv('LOG_LEVEL', null);

  switch (logLevel) {
    case 'info':
      return 'info';
    case 'warn':
      return 'warn';
    case 'error':
      return 'error';
    default:
      return 'debug';
  }
}
