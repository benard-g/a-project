import fastify from 'fastify';

import { ServiceLocator } from '../utils/ServiceLocator';

import { buildSchema } from './graphql/buildSchema';
import { createGraphqlServer } from './graphql/server';
import { createAuthenticateUserPlugin } from './plugins/authenticateUserPlugin';
import { createLoggerContextPlugin } from './plugins/loggerContextPlugin';
import { createServiceLocatorPlugin } from './plugins/serviceLocatorPlugin';
import { createTraceIdPlugin } from './plugins/traceIdPlugin';
import { createRoutesPlugin } from './routes';
import { createRoutesWithAuthPlugin } from './routesWithAuth';

interface Options {
  emitSchemaFile: string | false;
  serviceLocator: ServiceLocator;
}

export async function createServer(options: Options) {
  const { emitSchemaFile, serviceLocator } = options;

  const app = fastify();

  // Plugins
  app.register(createServiceLocatorPlugin(serviceLocator));
  app.register(createTraceIdPlugin());
  app.register(createLoggerContextPlugin());

  // REST (unauthenticated) routes
  app.register(createRoutesPlugin(), { prefix: '/api' });

  // Authenticated resources
  app.register(async (appWithAuth) => {
    // Plugins
    appWithAuth.register(createAuthenticateUserPlugin());

    // REST (authenticated) routes
    app.register(createRoutesWithAuthPlugin(), { prefix: '/api' });

    // GraphQL server
    const graphqlSchema = await buildSchema({ emitSchemaFile });
    const graphqlServer = createGraphqlServer(graphqlSchema);
    await graphqlServer.start();
    appWithAuth.register(graphqlServer.createHandler({ path: '/api/graphql' }));
  });

  return app;
}
