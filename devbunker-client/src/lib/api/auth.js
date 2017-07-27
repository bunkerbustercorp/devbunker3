import axios from 'axios';

export const checkEmailExist = (email) => axios.get('/api/auth/exist/email/' + email);
export const checkUsernameExist = (username) => axios.get('/api/auth/exist/username/' + username);

export const localRegister = ({email, username, password}) => axios.post('/api/auth/register/local', { email, username, password });
export const localLogin = ({email, password}) => axios.post('/api/auth/login/local', { email, password });

export const checkStatus = () => axios.get('/api/auth/check');
export const logout = () => axios.post('/api/auth/logout');