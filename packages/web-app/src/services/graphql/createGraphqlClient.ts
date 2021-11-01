import { ApolloClient, InMemoryCache } from '@apollo/client';

import { CONFIG } from '../../config';

import introspection from './possibleTypes.codegen';

const GRAPHQL_URL = `${CONFIG.API_URL}/graphql`;
const IS_DEV_MODE = CONFIG.NODE_ENV === 'development';

export function createGraphqlClient(accessToken: string) {
  return new ApolloClient({
    cache: new InMemoryCache({ possibleTypes: introspection.possibleTypes }),
    connectToDevTools: IS_DEV_MODE,
    uri: GRAPHQL_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
