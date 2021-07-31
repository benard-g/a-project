import { ApolloClient, InMemoryCache } from '@apollo/client';

import { CONFIG } from '../../config';

const GRAPHQL_URL = `${CONFIG.API_URL}/graphql`;

export function createClient() {
  return new ApolloClient({
    cache: new InMemoryCache({}),
    uri: GRAPHQL_URL,
  });
}
