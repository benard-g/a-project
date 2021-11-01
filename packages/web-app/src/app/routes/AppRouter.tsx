import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';

import { useAuthentication } from '../../hooks/authentication';
import AuthLoginPage from '../../pages/AuthLogin';

import AuthenticatedRoutes from './AuthenticatedRoutes';
import { getLoginRedirectUrl } from './utils';

function Routes() {
  const location = useLocation();

  const [{ isAuthenticated }] = useAuthentication();

  return (
    <Switch>
      {/* Public routes */}
      <Route component={AuthLoginPage} path="/auth/login" />

      {isAuthenticated ? (
        <AuthenticatedRoutes />
      ) : (
        <Route path="*">
          <Redirect to={getLoginRedirectUrl(location)} />
        </Route>
      )}
    </Switch>
  );
}

function AppRouter() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default AppRouter;
