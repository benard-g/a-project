import 'source-map-support/register';

import { loadConfig } from './config';
import { Logger } from './utils/Logger';

const config = loadConfig();

const logger = Logger.createNew({
  enabled: config.NODE_ENV !== 'test',
  minLevel: config.LOG_LEVEL,
  prettyPrint: config.NODE_ENV === 'development',
});

export async function main() {
  logger.info('Hello world!');
}

if (require.main === module) {
  main().catch((err) => {
    logger.error('Unexpected error during startup', { err });
    process.exit(1);
  });
}
