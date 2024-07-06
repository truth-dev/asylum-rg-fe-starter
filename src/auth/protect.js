import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    console.log("ProtectedRoute Component Mounted");
    console.log('profile:', rest.path);
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state while authentication is being determined
  }

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/profile" />
        )
      }
    />
  );
};

export default ProtectedRoute;