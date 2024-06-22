import React from 'react';
import { Link } from '@react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AuthButton from './auth-button';

const Nav = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <nav>
           {isAuthenticated && <Link to="/profile">Profile</Link>}
                <AuthButton />
        </nav>
    )
}

export default Nav;