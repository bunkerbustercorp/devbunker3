const Router = require('koa-router');
const auth = new Router();
const authCtrl = require('./auth.controller');

auth.post('/register/local', authCtrl.localRegister);
auth.post('/login/local', authCtrl.localLogin);
auth.get('/exist/:key(email|username)/:value', authCtrl.exist);
auth.post('/logout', authCtrl.logout);
auth.get('/check', authCtrl.check);

module.exports = auth;