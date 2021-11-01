import { loadConfig } from '../config';
import { createServer } from '../server';
import { AuthService } from '../services/auth/AuthService';
import { Jwt } from '../utils/Jwt';
import { Logger } from '../utils/Logger';
import { ServiceLocator } from '../utils/ServiceLocator';
import { UnwrapPromise } from '../utils/UnwrapPromise';

export async function createRestClient() {
  const config = loadConfig();

  // Instantiate all services
  const logger = Logger.createNew({ enabled: false });
  const jwtUtil = new Jwt(config.JWT_SECRET_KEY);
  const authService = new AuthService(
    {
      accessTokenDurationInSeconds: config.ACCESS_TOKEN_DURATION,
    },
    jwtUtil,
  );

  // Register all services
  const serviceLocator = ServiceLocator.createNew();
  serviceLocator.set(Logger, logger);
  serviceLocator.set(AuthService, authService);

  return createServer({
    allowedCorsOrigin: '*',
    emitSchemaFile: false,
    serviceLocator,
  });
}

export type RestClient = UnwrapPromise<ReturnType<typeof createRestClient>>;
