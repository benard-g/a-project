import { ApolloProvider } from '@apollo/client';
import { FC } from 'react';

import { createClient as createGraphqlClient } from '../services/graphql/createClient';

import AppRouter from './AppRouter';

const App: FC = () => {
  return (
    <ApolloProvider client={createGraphqlClient()}>
      <AppRouter />
    </ApolloProvider>
  );
};

export default App;
