import React from 'react';

const AuthButton = ({children, onClick}) => {
    return (
        <div className="auth-button" onClick={onClick}>
            {children}
        </div>
    );
};

export default AuthButton;