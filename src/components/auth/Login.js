import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const { loginWithRedirect } = useAuth0();
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
            className="btn btn-primary btn-block"
            onClick={() => loginWithRedirect()}
        >
            Log In
        </button >

    );
};

export default Login;