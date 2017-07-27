import React from 'react';
import { Link } from 'react-router-dom';

const AuthRightAlignedLink = ({children, to}) => {
    return (
        <div className="auth-aligner">
            <Link to={to} className="auth-styledlink">
                {children}
            </Link>
        </div>
    );
};

export default AuthRightAlignedLink;