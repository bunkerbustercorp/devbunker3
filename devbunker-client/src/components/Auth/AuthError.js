import React from 'react';

const AuthError = ({children}) => {
    return (
        <div className="auth-errorwrapper">
            {children}
        </div>
    );
};

export default AuthError;