import fastify from 'fastify';

import { ServiceLocator } from '../utils/ServiceLocator';
import { createGraphqlServer } from './graphql';
import { createLoggerContextPlugin } from './plugins/loggerContextPlugin';
import { createServiceLocatorPlugin } from './plugins/serviceLocatorPlugin';
import { createTraceIdPlugin } from './plugins/traceIdPlugin';

interface Options {
  serviceLocator: ServiceLocator;
}

export async function createServer(options: Options) {
  const { serviceLocator } = options;

  const app = fastify();

  // Register plugins
  app.register(createServiceLocatorPlugin(serviceLocator));
  app.register(createTraceIdPlugin());
  app.register(createLoggerContextPlugin());

  await graphqlServer.start();
  app.register(graphqlServer.createHandler({ path: '/api/graphql' }));

  return app;
}
