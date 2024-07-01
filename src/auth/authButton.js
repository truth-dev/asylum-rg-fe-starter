import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './auth.css';


const AuthButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    return (
       <div className='login'>
        {!isAuthenticated  && (
            
        <button className='auth-btn' onClick={() => loginWithRedirect()}>Log in</button>
            
            
            
        )}
     </div> 
       
    );
};

export default AuthButton;