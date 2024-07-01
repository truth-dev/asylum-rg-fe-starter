import {useAuth0} from '@auth0/auth0-react';
import './auth.css'

function Logout () {
    const {logout} = useAuth0();

    return (
        <button className='auth-btn' onClick={() => logout()}>Log out</button>
    );
}

export default Logout;