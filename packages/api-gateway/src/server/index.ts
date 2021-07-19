import fastify from 'fastify';

import { Logger } from '../utils/Logger';
import { createGraphqlServer } from './graphql';

export async function createServer(logger: Logger) {
  const app = fastify();

  const graphqlServer = createGraphqlServer(logger);
  await graphqlServer.start();
  app.register(graphqlServer.createHandler({ path: '/api/graphql' }));

  return app;
}
