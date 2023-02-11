const express = require('express');

const errorMiddleware = require('./middlewares/error');
const validateLogin = require('./middlewares/validateLogin');
const validateRegisterUser = require('./middlewares/validateRegisterUser');
const authenticateToken = require('./middlewares/validateToken');

const { userLogin } = require('./controllers/login.controller');
const { userRegister,
  findAllUsers,
  findUserById,
} = require('./controllers/user.controller');
const validateAddCategory = require('./middlewares/validateAddCategory');

const { addNewCategory } = require('./controllers/category.controller');

const app = express();

app.use(express.json());

app.get('/user', authenticateToken, findAllUsers);
app.get('/user/:id', authenticateToken, findUserById);
app.post('/user', validateRegisterUser, userRegister);

app.post('/login', validateLogin, userLogin);

app.post('/categories', authenticateToken, validateAddCategory, addNewCategory);

app.use(errorMiddleware);

module.exports = app;
