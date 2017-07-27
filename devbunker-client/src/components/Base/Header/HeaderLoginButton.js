import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLoginButton = () => {
    return (
        <Link className="header-loginbutton" to="/auth/login">
            로그인 / 가입
        </Link>
    );
};

export default HeaderLoginButton;