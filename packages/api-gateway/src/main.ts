import 'source-map-support/register';

import { loadConfig } from './config/index';
import { Logger } from './utils/Logger';

const config = loadConfig();

const logger = new Logger({
  prettyPrint: config.NODE_ENV === 'development',
  enabled: config.NODE_ENV !== 'test',
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
