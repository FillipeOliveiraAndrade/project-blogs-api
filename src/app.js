const express = require('express');

const errorMiddleware = require('./middlewares/error');
const validateLogin = require('./middlewares/validateLogin');
const validateRegisterUser = require('./middlewares/validateRegisterUser');
const validateAddCategory = require('./middlewares/validateAddCategory');
const authenticateToken = require('./middlewares/validateToken');
const validateUpdatePost = require('./middlewares/validateUpdatePost');
const validateAddPost = require('./middlewares/validateAddPost');

const { userLogin } = require('./controllers/login.controller');
const { userRegister,
  findAllUsers,
  findUserById,
  deletingMyUser,
} = require('./controllers/user.controller');

const { addNewCategory,
  getAllCategories,
} = require('./controllers/category.controller');

const { 
  getAllPosts, 
  getPostsById, 
  getTitleOrContentForQuery,
  updatePostById,
  deletingPost,
  addNewPost,
} = require('./controllers/post.controller');

const app = express();

app.use(express.json());

app.post('/user', validateRegisterUser, userRegister);
app.get('/user', authenticateToken, findAllUsers);
app.get('/user/:id', authenticateToken, findUserById);
app.delete('/user/me', authenticateToken, deletingMyUser);

app.post('/login', validateLogin, userLogin);

app.post('/categories', authenticateToken, validateAddCategory, addNewCategory);
app.get('/categories', authenticateToken, getAllCategories);

app.post('/post', authenticateToken, validateAddPost, addNewPost);
app.get('/post', authenticateToken, getAllPosts);
app.get('/post/search', authenticateToken, getTitleOrContentForQuery);
app.get('/post/:id', authenticateToken, getPostsById);
app.put('/post/:id', authenticateToken, validateUpdatePost, updatePostById);
app.delete('/post/:id', authenticateToken, deletingPost);

app.use(errorMiddleware);

module.exports = app;
