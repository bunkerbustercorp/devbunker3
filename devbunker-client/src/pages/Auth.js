import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AuthWrapper from 'components/Auth';
import { AuthLogin, AuthRegister } from 'containers/Auth';

// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'redux/modules/base';

class Auth extends Component {

    componentWillMount() {
        this.props.BaseActions.setHeaderVisibility(false);
    }

    componentWillUnmount() {
        this.props.BaseActions.setHeaderVisibility(true);
    }

    render() {
        return (
            <AuthWrapper>
                <Route path="/auth/login" component={AuthLogin}/>
                <Route path="/auth/register" component={AuthRegister}/>
            </AuthWrapper>
        );
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(Auth);
