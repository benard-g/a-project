import { ApolloError } from 'apollo-server-fastify';
import { GraphQLError } from 'graphql';

import { Logger } from '../../../utils/Logger';
import { Context } from '../Context';

import type { PluginDefinition } from './types/PluginDefinition';

export function registerLoggerPlugin(): PluginDefinition {
  return {
    requestDidStart: async ({ request, context }) => {
      const { operationName, variables } = request;
      const { serviceLocator } = context as Context;

      const logger = serviceLocator.get(Logger);
      logger.debug('[graphql] New query', { operationName, variables });

      return {
        didEncounterErrors: async ({ errors }) => {
          for (const error of errors) {
            const err = error.originalError || error;
            if (err instanceof GraphQLError || err instanceof ApolloError) {
              logger.info('[graphql] Handled expected error', { err });
            } else {
              logger.error('[graphql] Internal server error', { err });
            }
          }
        },
      };
    },
  };
}
