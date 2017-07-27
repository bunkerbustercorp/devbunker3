import React from 'react';
import { Link } from 'react-router-dom';

const AuthLogo = () => {
    return (
        <div className="auth-logowrapper">
            <Link className="auth-logo" to="/">
                DEVBUNKER
            </Link>
        </div>
    );
};

export default AuthLogo;