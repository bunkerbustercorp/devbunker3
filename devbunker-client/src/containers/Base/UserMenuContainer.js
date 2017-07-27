import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import UserMenuWrapper, { UserMenuItem, UserMenuUsername } from 'components/Base/UserMenu';

// import redux dependencies
import storage from 'lib/storage';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'redux/modules/base';
import * as userActions from 'redux/modules/user';

class UserMenuContainer extends Component {

    handleClickOutside = (e) => {
        const { BaseActions } = this.props;
        BaseActions.setUserMenuVisibility(false);
    }

    handleLogout = async () => {
        const { UserActions } = this.props;

        try {
            await UserActions.logout();
        } catch (e) {
            console.log(e);
        }

        storage.remove('loggedInfo');
        window.location.href = '/';
    }

    render() {
        const { visible, username } = this.props;
        const { handleLogout } = this;


        if(!visible) {
            return null;
        }

        return (
            <UserMenuWrapper>
                <UserMenuUsername username={username}/>
                <UserMenuItem>나의 흐름</UserMenuItem>
                <UserMenuItem>설정</UserMenuItem>
                <UserMenuItem onClick={handleLogout}>로그아웃</UserMenuItem>
            </UserMenuWrapper>
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['userMenu', 'visible']),
        username: state.user.getIn(['loggedInfo', 'username'])
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(onClickOutside(UserMenuContainer));