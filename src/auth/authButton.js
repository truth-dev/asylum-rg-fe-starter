import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import './auth.css';

const AuthButton = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <div className="login">
      {!isAuthenticated ? (
        <Link to="#" className="auth-link" onClick={(e) => { e.preventDefault(); loginWithRedirect(); }}>
          Log in
        </Link>
      ) : (
        <Link to="#" className="auth-link" onClick={(e) => { e.preventDefault(); logout({ returnTo: window.location.origin }); }}>
          Log out
        </Link>
      )}
    </div>
  );
};

export default AuthButton;