import React from 'react';

const Header = ({children}) => {
    return (
        <div className="header">
            <div className="background">
                <div className="contents">
                    {children}
                </div>
            </div>
            <div className="border">
            </div>
        </div>
    );
};

export default Header;