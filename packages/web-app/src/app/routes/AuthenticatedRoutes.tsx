import { ApolloProvider } from '@apollo/client';
import { Route, Switch } from 'react-router-dom';

import { useAuthentication } from '../../hooks/authentication';
import HomePage from '../../pages/Home';
import { createGraphqlClient } from '../../services/graphql/createGraphqlClient';

function AuthenticatedRoutes() {
  const [authState] = useAuthentication();

  if (!authState.isAuthenticated) {
    return null;
  }

  return (
    <ApolloProvider client={createGraphqlClient(authState.accessToken)}>
      <Switch>
        <Route component={HomePage} exact path="/" />
      </Switch>
    </ApolloProvider>
  );
}

export default AuthenticatedRoutes;
