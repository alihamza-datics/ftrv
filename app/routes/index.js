import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../components/hoc/privateRoute';
import NotFoundPage from '../containers/pageNotFound/loadable';
import { AppRoutes } from './routeFuncs';

function Routes() {
  return (
    <>
      <Switch>
        <AppRoutes />
        <PrivateRoute component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default Routes;
