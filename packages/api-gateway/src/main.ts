import 'source-map-support/register';
import 'reflect-metadata';

import { Config, loadConfig } from './config';
import { createServer } from './server';
import { Logger } from './utils/Logger';
import { ServiceLocator } from './utils/ServiceLocator';

const SCHEMA_GENERATION_PATH = '../../schema.graphql';

export async function main(config: Config, serviceLocator: ServiceLocator) {
  const isDevMode = config.NODE_ENV === 'development';

  const logger = serviceLocator.get(Logger);

  logger.info('[app] Server starting...');
  const server = await createServer({
    serviceLocator,
    emitSchemaFile: isDevMode ? SCHEMA_GENERATION_PATH : false,
  });
  await server.listen(config.PORT);
  logger.info('[app] Server started', { port: config.PORT });
}

if (require.main === module) {
  const config = loadConfig();

  const logger = Logger.createNew({
    enabled: config.NODE_ENV !== 'test',
    minLevel: config.LOG_LEVEL,
    prettyPrint: config.NODE_ENV === 'development',
  });

  const serviceLocator = ServiceLocator.createNew();
  serviceLocator.set(Logger, logger);

  main(config, serviceLocator).catch((err) => {
    logger.error('[app] Unexpected error during startup', { err });
    process.exit(1);
  });
}
