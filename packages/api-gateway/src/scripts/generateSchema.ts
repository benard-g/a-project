import 'source-map-support/register';
import 'reflect-metadata';

import { Config, loadConfig } from '../config';
import { buildSchema } from '../server/graphql/buildSchema';
import { Logger } from '../utils/Logger';
import { ServiceLocator } from '../utils/ServiceLocator';

async function main(config: Config, serviceLocator: ServiceLocator) {
  const logger = serviceLocator.get(Logger);

  logger.info('[script][generateSchema] Schema generating...');
  await buildSchema({
    emitSchemaFile: config.GRAPHQL_SCHEMA_GENERATION_PATH,
  });
  logger.info('[script][generateSchema] Schema generated');
}

if (require.main === module) {
  const config = loadConfig();

  const logger = Logger.createNew({
    enabled: config.NODE_ENV !== 'test',
    minLevel: config.LOG_LEVEL as 'debug' | 'info' | 'warn' | 'error',
    prettyPrint: config.NODE_ENV === 'development',
  });

  const serviceLocator = ServiceLocator.createNew();
  serviceLocator.set(Logger, logger);

  main(config, serviceLocator).catch((err) => {
    logger.error('[script][generateSchema] Unexpected error during startup', {
      err,
    });
    process.exit(1);
  });
}
