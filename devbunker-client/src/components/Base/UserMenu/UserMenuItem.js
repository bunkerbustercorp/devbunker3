import React from 'react';

const UserMenuItem = ({children, onClick}) => {
    return (
        <div className="usermenu-item" onClick={onClick}>
            {children}
        </div>
    );
};

export default UserMenuItem;