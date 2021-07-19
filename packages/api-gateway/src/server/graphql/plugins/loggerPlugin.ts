import { ApolloError } from 'apollo-server-fastify';
import { GraphQLError } from 'graphql';

import { Logger } from '../../../utils/Logger';
import { PluginDefinition } from './types/PluginDefinition';

export function registerLoggerPlugin(logger: Logger): PluginDefinition {
  return {
    requestDidStart: async ({ request }) => {
      const { operationName, variables } = request;

      // TODO get logger from context
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
