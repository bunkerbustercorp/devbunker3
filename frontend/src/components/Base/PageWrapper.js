import React from 'react';

const PageWrapper = ({children}) => {
    return (
        <div className="pagewrapper">
            {children}
        </div>
    );
};

export default PageWrapper;