import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Logout = () => {
  const { logout } = useAuth0();
  return (
    <button
      style={{
        color: '#E2F0F7',
        paddingRight: '75px',
        background: 'none',
        border: 'none',
        font: 'inherit',
        cursor: 'pointer',

      }}
      className="btn btn-danger btn-block"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </button>
  );
};

export default Logout;