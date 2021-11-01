import { AuthenticationProvider } from '../hooks/authentication';

import AppRouter from './routes/AppRouter';

function App() {
  return (
    <AuthenticationProvider>
      <AppRouter />
    </AuthenticationProvider>
  );
}

export default App;
