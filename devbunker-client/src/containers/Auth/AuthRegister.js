import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import { isEmail, isLength, isAlphanumeric } from 'validator';
import { AuthContents, AuthInputWithLabel, AuthButton, AuthRightAlignedLink, AuthError } from 'components/Auth';

// import redux dependencies
import storage from 'lib/storage';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from 'redux/modules/auth';
import * as userActions from 'redux/modules/user';

class AuthRegister extends Component {

    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('register');
    }

    setError = (message) => {
        const { AuthActions } = this.props;
        AuthActions.setError({
            form: 'register',
            message
        });
    }

    validate = {
        email: (value) => {
            if(!isEmail(value)) {
                this.setError('잘못된 이메일 형식 입니다.');
                return false;
            }
            return true;
        },
        username: (value) => {
            if(!isAlphanumeric(value) || !isLength(value, { min:4, max: 15 })) {
                this.setError('아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.');
                return false;
            }
            return true;
        },
        password: (value) => {
            if(!isLength(value, { min: 6 })) {
                this.setError('비밀번호를 6자 이상 입력하세요.');
                return false;
            }
            this.setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
            return true;
        },
        passwordConfirm: (value) => {
            if(this.props.form.get('password') !== value) {
                this.setError('비밀번호확인이 일치하지 않습니다.');
                return false;
            }
            this.setError(null); 
            return true;
        }
    }

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'register'
        });

        // 검증작업 진행
        const validation = this.validate[name](value);
        if(name.indexOf('password') > -1 || !validation) return; // 비밀번호 검증이거나, 검증 실패하면 여기서 마침

        // 이메일, 아이디 중복 확인
        const check = name === 'email' ? this.checkEmailExist : this.checkUsernameExist; // name 에 따라 이메일체크할지 아이디 체크 할지 결정
        check(value);
    }

    checkEmailExist = debounce(async (email) => {
        const { AuthActions } = this.props;

        try {
            await AuthActions.checkEmailExist(email);
            
            if(this.props.exist.get('email')) {
                this.setError('이미 존재하는 이메일입니다.');
            } else {
                this.setError(null);
            }
        } catch (e) {
            console.log(e);
        }
    }, 300)

    checkUsernameExist = debounce(async (username) => {
        const { AuthActions } = this.props;

        try {
            await AuthActions.checkUsernameExist(username);

            if(this.props.exist.get('username')) {
                this.setError('이미 존재하는 아이디입니다.');
            } else {
                this.setError(null);
            }
        } catch (e) {
            console.log(e);
        }
    }, 300)

    handleLocalRegister = async () => {
        const { form, error, history, AuthActions, UserActions } = this.props;
        const { email, username, password, passwordConfirm } = form.toJS();

        const { validate } = this;

        if(error) return;
        if(!validate['email'](email)
            || !validate['username'](username)
            || !validate['password'](password)
            || !validate['passwordConfirm'](passwordConfirm)) {
                // 하나라도 실패하면 진행하지 않음
                return;
        }

        try {
            await AuthActions.localRegister({
                email, username, password
            });
            const loggedInfo = this.props.result.toJS();
            
            storage.set('loggedInfo', loggedInfo);
            UserActions.setLoggedInfo(loggedInfo);
            UserActions.setVlidated(true);

            history.push('/'); // 회원가입 성공시 홈페이지로 이동
        } catch(e) {
            // 에러 처리하기
            if(e.response.status === 409) {
                const { key } = e.response.data;
                const message = key === 'email' ? '이미 존재하는 이메일입니다.' : '이미 존재하는 아이디입니다.';
                return this.setError(message);
            }
            this.setError('알 수 없는 에러가 발생했습니다.')
        }
    }

    render() {

        const { error } = this.props;
        const { email, username, password, passwordConfirm } = this.props.form.toJS();
        const { handleChange, handleLocalRegister } = this;

        return (
            <AuthContents title="회원가입">
                <AuthInputWithLabel
                    label="이메일"
                    name="email"
                    placeholder="이메일"
                    value={email}
                    onChange={handleChange}
                />
                <AuthInputWithLabel
                    label="아이디"
                    name="username"
                    placeholder="아이디"
                    value={username}
                    onChange={handleChange}
                />
                <AuthInputWithLabel
                    label="비밀번호"
                    name="password"
                    placeholder="비밀번호"
                    type="password"
                    value={password}
                    onChange={handleChange}
                />
                <AuthInputWithLabel
                    label="비밀번호 확인"
                    name="passwordConfirm"
                    placeholder="비밀번호 확인"
                    type="password"
                    value={passwordConfirm}
                    onChange={handleChange}
                />
                {
                    error && <AuthError>{error}</AuthError>
                }
                <AuthButton onClick={handleLocalRegister}>회원가입</AuthButton>
                <AuthRightAlignedLink to="/auth/login">로그인</AuthRightAlignedLink>
            </AuthContents>
        );
    }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['register', 'form']),
        error: state.auth.getIn(['register', 'error']),
        exist: state.auth.getIn(['register', 'exist']),
        result: state.auth.get('result')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(AuthRegister);
