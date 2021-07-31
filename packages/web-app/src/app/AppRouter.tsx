import { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from '../pages/Home';

const AppRouter: FC = () => {
  return (
    <Router>
      <Switch>
        <Route component={HomePage} exact path="/" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
