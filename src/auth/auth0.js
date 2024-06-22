import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { useHistory } from '@react-router-dom';

const Auth0Provider = ({ children }) => {
  const history = useHistory();

  return (
    <Auth0Provider>
     
    </Auth0Provider>
  );
}