const express = require('express');

const errorMiddleware = require('./middlewares/error');
const validateLogin = require('./middlewares/validateLogin');

const { userLogin } = require('./controllers/login.controller');

const app = express();

app.use(express.json());

app.post('/login', validateLogin, userLogin);

app.use(errorMiddleware);

module.exports = app;
