import { handleActions, createAction } from 'redux-actions';
import { pender } from 'redux-pender';
import * as AuthAPI from 'lib/api/auth';
import { Map } from 'immutable';

/* actions */
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const CHECK_EMAIL_EXIST = 'auth/CHECK_EMAIL_EXIST';
const CHECK_USERNAME_EXIST = 'auth/CHECK_USERNAME_EXIST';

const LOCAL_REGISTER = 'auth/LOCAL_REGISTER';
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';

const LOGOUT = 'auth/LOGOUT';

const SET_ERROR = 'auth/SET_ERROR';

/* actions creator */
export const changeInput = createAction(CHANGE_INPUT);
export const initializeForm = createAction(INITIALIZE_FORM);

export const checkEmailExist = createAction(CHECK_EMAIL_EXIST, AuthAPI.checkEmailExist);
export const checkUsernameExist = createAction(CHECK_USERNAME_EXIST, AuthAPI.checkUsernameExist);

export const localRegister = createAction(LOCAL_REGISTER, AuthAPI.localRegister);
export const localLogin = createAction(LOCAL_LOGIN, AuthAPI.localLogin);

export const logout = createAction(LOGOUT, AuthAPI.logout);

export const setError = createAction(SET_ERROR);

/* initialState */
const initialState = Map({
    register: Map({
        form: Map({
            email: '',
            username: '',
            password: '',
            passwordConfirm: ''
        }),
        exist: Map({
            email: false,
            password: false
        }),
        error: null
    }),
    login: Map({
        form: Map({
            email: '',
            password: ''
        }),
        error: null
    }),
    result: Map({})
});

/* reducer */
export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, 'form', name], value);
    },
    [INITIALIZE_FORM]: (state, action) => {
        const initialForm = initialState.get(action.payload);
        return state.set(action.payload, initialForm);
    },
    ...pender({
        type: CHECK_EMAIL_EXIST,
        onSuccess: (state, action) => state.setIn(['register', 'exist', 'email'], action.payload.data.exist)
    }),
    ...pender({
        type: CHECK_USERNAME_EXIST,
        onSuccess: (state, action) => state.setIn(['register', 'exist', 'username'], action.payload.data.exist)
    }),
    ...pender({
        type: LOCAL_LOGIN,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),
    ...pender({
        type: LOCAL_REGISTER,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),
    [SET_ERROR]: (state, action) => {
        const { form, message } = action.payload;
        return state.setIn([form, 'error'], message);
    }
}, initialState);