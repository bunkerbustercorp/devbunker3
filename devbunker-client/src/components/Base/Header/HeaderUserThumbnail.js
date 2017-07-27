import React from 'react';

const HeaderUserThumbnail = ({thumbnail, onClick}) => {
    let UserThumbnail = {
        backgroundImage: `url(${thumbnail})`
    }

    return (
        <div className="header-userthumbnail" style={UserThumbnail} onClick={onClick}>
            
        </div>
    );
};

export default HeaderUserThumbnail;