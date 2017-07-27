import React, { Component } from 'react';
import HeaderWrapper, { HeaderContents, HeaderLogo, HeaderLoginButton, HeaderUserThumbnail } from 'components/Base/Header';
import UserMenuContainer from './UserMenuContainer';

// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from 'redux/modules/user';
import * as baseActions from 'redux/modules/base';


class HeaderContainer extends Component {

    handleThumbnailClick = () => {
        const { BaseActions } = this.props;
        BaseActions.setUserMenuVisibility(true);
    }

    render() {
        const { visible, user } = this.props;
        const { handleThumbnailClick } = this;

        if(!visible) return null;

        return (
            <HeaderWrapper>
                <HeaderContents>
                    <HeaderLogo/>
                    <div className="header-spacer"/>

                    { 
                        user.get('logged')
                            ? (
                                <HeaderUserThumbnail thumbnail={user.getIn(['loggedInfo', 'thumbnail'])} onClick={handleThumbnailClick}/>
                            )
                            : <HeaderLoginButton/>
                    }
                    <UserMenuContainer eventTypes="click"/>
                </HeaderContents>
            </HeaderWrapper>
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['header', 'visible']),
        user: state.user
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(HeaderContainer);