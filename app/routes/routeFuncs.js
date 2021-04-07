import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from '../components/hoc/privateRoute';
import Home from '../containers/home/loadable';
import { ROLES } from '../utils/constants';
import { routeArray } from './routeArray';

const routeTypes = { public: 'public', private: 'private' };
const renderRoutes = (_routeArray, parentPath = '') =>
  _routeArray &&
  _routeArray.map((route) => (
    <>
      {route.routeType === routeTypes.public ? (
        <Route
          exact={route.exact || true}
          path={parentPath + route.path || '/'}
          component={route.component || Home}
          roles={route.roles || [ROLES.ADMIN, ROLES.USER]}
        />
      ) : (
        <PrivateRoute
          exact={route.exact || true}
          path={parentPath + route.path || '/'}
          component={route.component || Home}
          roles={route.roles || [ROLES.ADMIN, ROLES.USER]}
        />
      )}
      {route.nestedRoutes && renderRoutes(route.nestedRoutes, route.path)}
    </>
  ));

export const AppRoutes = () => <>{renderRoutes(routeArray)}</>;

const filterRouteArrayByKey = (allRouteArray, key) =>
  allRouteArray.filter((val) => {
    const result = val.simplifiedPath
      ? val.simplifiedPath === key
      : val.path.substring(1) === key;

    return result;
  });
export const returnNoOfEntriesToSkip = (
  parentRouteName,
  currentPathNameEntry = null
) => {
  const parentObj = filterRouteArrayByKey(routeArray, parentRouteName);
  if (currentPathNameEntry && parentObj[0] && parentObj[0].nestedRoutes) {
    const childObj = filterRouteArrayByKey(
      parentObj[0].nestedRoutes,
      currentPathNameEntry
    );
    return childObj.length > 0 && childObj[0].noOfEnteriesToSkipAfterThisEntry
      ? childObj[0].noOfEnteriesToSkipAfterThisEntry
      : 0;
  }
  return parentObj.length > 0 && parentObj[0].noOfEnteriesToSkipAfterThisEntry
    ? parentObj[0].noOfEnteriesToSkipAfterThisEntry
    : 0;
};
export const returnBreadCrumbKey = (
  parentRouteName,
  currentPathNameEntry = null
) => {
  const parentObj = filterRouteArrayByKey(routeArray, parentRouteName);
  if (currentPathNameEntry && parentObj[0] && parentObj[0].nestedRoutes) {
    const childObj = filterRouteArrayByKey(
      parentObj[0].nestedRoutes,
      currentPathNameEntry
    );
    return childObj.length > 0
      ? childObj[0] && childObj[0].breadCrumbKey
      : currentPathNameEntry;
  }
  return parentObj.length > 0 && parentObj[0].breadCrumbKey
    ? parentObj[0].breadCrumbKey
    : parentRouteName;
};
