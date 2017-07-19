import React, { Component } from 'react';
import Header, { HeaderLogo, HeaderLoginButton } from 'components/Base/Header';

class HeaderContainer extends Component {
    render() {
        return (
            <Header>
                <HeaderLogo/>
                <div className="spacer"/>
                <HeaderLoginButton/>
            </Header>
        );
    }
}

export default HeaderContainer;