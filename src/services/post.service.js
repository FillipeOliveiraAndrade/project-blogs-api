const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../models');

const findAllPosts = async () => {
  const data = await BlogPost.findAll({
    include: [
      { 
        model: User, 
        as: 'user', 
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        attributes: { exclude: ['password'] },
      },
    ],
  });
  
  return data;
};

const findPostsById = async (id) => {
  const data = await BlogPost.findOne({
    where: { id },
    include: [
      { 
        model: User, 
        as: 'user', 
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        attributes: { exclude: ['password', 'PostCategory'] },
      },
    ],
  });
  
  return data;
};

const getBlogPostById = async (id) => {
  const { userId } = await BlogPost.findByPk(id);
  return userId;
};

const foundTitleOrContent = async (q) => {
  const query = `%${q}%`;

  const post = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: query } },
        { content: { [Op.like]: query } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  return post;
};

const updatedPost = async ({ title, content, id }) => {
  const { userId } = await BlogPost.findByPk(id);
  
  await BlogPost.update({ title, content }, { where: { userId } });

  const result = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  return result;
};

module.exports = {
  findAllPosts,
  findPostsById,
  getBlogPostById,
  foundTitleOrContent,
  updatedPost,
};