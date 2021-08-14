import { ApolloServer } from 'apollo-server-fastify';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GraphQLSchema } from 'graphql';

import { registerLoggerPlugin } from './plugins/loggerPlugin';
import { Context } from './Context';

export function createGraphqlServer(schema: GraphQLSchema) {
  return new ApolloServer({
    context: (ctx): Context => {
      const request = ctx.request as FastifyRequest;
      const reply = ctx.reply as FastifyReply;

      return {
        reply,
        request,
        serviceLocator: request.serviceLocator,
      };
    },
    plugins: [registerLoggerPlugin()],
    schema,
  });
}
