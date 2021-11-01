import { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { useAuthentication } from '../../hooks/authentication';

function AuthLoginPage() {
  const { search } = useLocation();
  const [{ isAuthenticated }, { authenticate, error, loading }] =
    useAuthentication();

  useEffect(() => {
    if (!isAuthenticated && !error) {
      console.log('AUTHENTICATE');
      authenticate();
    }
  }, [authenticate, error, isAuthenticated]);

  if (loading) {
    return <div>Login in progress...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error during authentication</p>
        <code>{error.stack}</code>
      </div>
    );
  }

  if (isAuthenticated) {
    const params = new URLSearchParams(search);
    const redirectPath = params.get('path');
    const redirectSearch = params.get('search');
    const redirectHash = params.get('hash');
    const redirectUrl =
      redirectPath + (redirectSearch || '') + (redirectHash || '');

    return <Redirect to={redirectUrl} />;
  }

  return <div>Login will start soon</div>;
}

export default AuthLoginPage;
