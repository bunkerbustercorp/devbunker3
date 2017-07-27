import React from 'react';

const AuthContents = ({children, title}) => {
    return (
        <div className="auth-contents">
            <div className="auth-title">
                {title}
            </div>
            {children}
        </div>
    );
};

export default AuthContents;