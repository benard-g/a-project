import 'source-map-support/register';
import 'reflect-metadata';

import { Connection } from 'typeorm';

import { createDatabaseConnection } from './model/database';
import { AuthService } from './services/auth/AuthService';
import { Jwt } from './utils/Jwt';
import { Logger } from './utils/Logger';
import { ServiceLocator } from './utils/ServiceLocator';
import { Config, loadConfig } from './config';
import { createServer } from './server';

export async function main(config: Config, serviceLocator: ServiceLocator) {
  const logger = serviceLocator.get(Logger);
  logger.info('[app] Services initializing...');
  const jwtUtil = new Jwt(config.JWT_SECRET_KEY);
  const authService = new AuthService(
    { accessTokenDurationInSeconds: config.ACCESS_TOKEN_DURATION },
    jwtUtil,
  );
  serviceLocator.set(AuthService, authService);
  logger.info('[app] Services initialized');

  logger.info('[app] Database connecting...');
  const conn = await createDatabaseConnection({
    databaseUrl: config.DATABASE_URL,
  });
  serviceLocator.set(Connection, conn);
  logger.info('[app] Database connected');

  logger.info('[app] Server starting...');
  const server = await createServer({
    allowedCorsOrigin: config.ALLOWED_CORS_ORIGIN,
    serviceLocator,
    emitSchemaFile: config.GRAPHQL_SCHEMA_GENERATION_PATH,
  });
  await server.listen(config.PORT);
  logger.info('[app] Server started', { port: config.PORT });
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

  main(config, serviceLocator).catch((err: Error) => {
    logger.error('[app] Unexpected error during startup', { err });
    process.exit(1);
  });
}
