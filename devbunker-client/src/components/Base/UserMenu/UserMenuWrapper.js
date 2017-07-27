import React from 'react';

const UserMenuWrapper = ({children}) => {
    return (
        <div className="usermenu-positioner">
            <div className="usermenu-background">
                {children}
            </div>
        </div>
    );
};

export default UserMenuWrapper;