import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

import base from './base';
import auth from './auth';
import user from './user';

export default combineReducers({
    base,
    auth,
    user,
    pender: penderReducer
});