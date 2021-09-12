import { DocumentNode, print } from 'graphql';

import type { UnwrapPromise } from '../utils/UnwrapPromise';

import { createRestClientWithAuth } from './createRestClientWithAuth';

export async function createGraphqlClient() {
  const restClientWithAuth = await createRestClientWithAuth();

  return {
    close: restClientWithAuth.close,
    send: async (document: DocumentNode, variables?: Record<string, any>) =>
      restClientWithAuth.post('/api/graphql', {
        query: print(document),
        variables,
      }),
  };
}

export type GraphqlClient = UnwrapPromise<
  ReturnType<typeof createGraphqlClient>
>;
