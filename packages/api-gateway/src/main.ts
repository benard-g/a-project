import 'source-map-support/register';

import { loadConfig } from './config';
import { createServer } from './server';
import { Logger } from './utils/Logger';

const config = loadConfig();

const logger = Logger.createNew({
  enabled: config.NODE_ENV !== 'test',
  minLevel: config.LOG_LEVEL,
  prettyPrint: config.NODE_ENV === 'development',
});

export async function main() {
  logger.info('Server starting...');
  const server = await createServer(logger);
  await server.listen(config.PORT);
  logger.info('Server started', { port: config.PORT });
}

if (require.main === module) {
  main().catch((err) => {
    logger.error('Unexpected error during startup', { err });
    process.exit(1);
  });
}
