import React from 'react';

const AuthInputWidthLabel = ({Label, ...rest}) => {
    return (
        <div className="auth-inputwithlabel">
            <div className="auth-label">
                {Label}
            </div>
            <input className="auth-input" {...rest}/>
        </div>
    );
};

export default AuthInputWidthLabel;