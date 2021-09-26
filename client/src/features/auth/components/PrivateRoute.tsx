import React from 'react';
import { Route, Redirect } from 'react-router';
import { useAuth } from 'lib/auth';

interface PrivateRouteProps {
  children: React.ReactNode;
  path: string;
}

export const PrivateRoute = ({ children, path, ...rest }: PrivateRouteProps) => {
  const { user } = useAuth();

  return (
    <Route
      path={path}
      render={() => user ? children : <Redirect to='/login' />}
      {...rest}
    />
  );
};