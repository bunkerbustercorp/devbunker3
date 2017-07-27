import React from 'react';
import AuthLogo from './AuthLogo';

const AuthWrapper = ({children}) => {
    return (
        <div className="auth-positioner">
            <div className="auth-shadowbox">
                <AuthLogo/>
                {children}
            </div>
        </div>
    );
};

export default AuthWrapper;