import { ApolloClient, InMemoryCache } from '@apollo/client';

import { CONFIG } from '../../config';

const GRAPHQL_URL = `${CONFIG.API_URL}/graphql`;
const IS_DEV_MODE = CONFIG.NODE_ENV === 'development';

export function createClient() {
  return new ApolloClient({
    cache: new InMemoryCache({}),
    connectToDevTools: IS_DEV_MODE,
    uri: GRAPHQL_URL,
  });
}
