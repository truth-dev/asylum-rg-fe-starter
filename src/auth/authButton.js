import React from 'react';
import { useAuth0} from '@auth0/auth0-react';


const AuthButton = () => {
    const {loginRedirect, logout, isAuthenticated} = useAuth0();

    return (
       <div className='login'>
        {!isAuthenticated  && (
            <>
            <button onClick={() => loginRedirect()}>Log in</button>
            <button onClick={() => loginRedirect()}>Sign up</button>
            
            </>
        )}
        {isAuthenticated && <button onClick={() => logout({returnTo: window.location.origin})}>Log out</button>}
       </div>
       
    );
};

export default AuthButton;