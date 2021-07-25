import fastify from 'fastify';

import { ServiceLocator } from '../utils/ServiceLocator';
import { createGraphqlServer } from './graphql';
import { buildSchema } from './graphql/buildSchema';
import { createLoggerContextPlugin } from './plugins/loggerContextPlugin';
import { createServiceLocatorPlugin } from './plugins/serviceLocatorPlugin';
import { createTraceIdPlugin } from './plugins/traceIdPlugin';

interface Options {
  emitSchemaFile: string | false;
  serviceLocator: ServiceLocator;
}

export async function createServer(options: Options) {
  const { emitSchemaFile, serviceLocator } = options;

  const app = fastify();

  // Register plugins
  app.register(createServiceLocatorPlugin(serviceLocator));
  app.register(createTraceIdPlugin());
  app.register(createLoggerContextPlugin());

  // Configure GraphQL server
  const graphqlSchema = await buildSchema({ emitSchemaFile });
  const graphqlServer = createGraphqlServer(graphqlSchema);
  await graphqlServer.start();
  app.register(graphqlServer.createHandler({ path: '/api/graphql' }));

  return app;
}
