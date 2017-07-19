const Router = require('koa-router');
const auth = new Router();
const authCtrl = require('./auth.controller');

auth.get('/test', authCtrl.test);

module.exports = auth;