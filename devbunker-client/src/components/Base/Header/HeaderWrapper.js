import React from 'react';

const HeaderWrapper = ({children}) => {
    return (
        <div className="header-positioner">
            <div className="header-background">
                {children}
            </div>
            <div className="header-border">
            </div>
        </div>
    );
};

export default HeaderWrapper;