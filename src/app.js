const express = require('express');

const errorMiddleware = require('./middlewares/error');
const validateLogin = require('./middlewares/validateLogin');
const validateRegisterUser = require('./middlewares/validateRegisterUser');

const { userLogin } = require('./controllers/login.controller');
const { userRegister } = require('./controllers/user.controller');

const app = express();

app.use(express.json());

app.post('/login', validateLogin, userLogin);
app.post('/user', validateRegisterUser, userRegister);

app.use(errorMiddleware);

module.exports = app;
