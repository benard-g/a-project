import { getFromEnv } from './utils/env';
import { NodeEnv } from './types';

export function getDatabaseUri(nodeEnv: NodeEnv): string {
  const varName = 'DATABASE_URL';

  const DEV_DB = 'postgres://postgres:password@localhost:5432/postgres';
  const TEST_DB = 'postgres://postgres:password@localhost:2345/postgres';

  switch (nodeEnv) {
    case 'development':
      return getFromEnv(varName, DEV_DB);
    case 'test':
      return getFromEnv(varName, TEST_DB);
    default:
      return getFromEnv(varName);
  }
}
