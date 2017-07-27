import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLogo = () => {
    return (
        <Link className="header-logo" to="/">
            DEVBUNKER
        </Link>
    );
};

export default HeaderLogo;