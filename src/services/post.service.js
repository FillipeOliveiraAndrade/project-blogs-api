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
  const result = await BlogPost.findOne({ where: { id } });
  return result;
};

const deletePostById = async (id) => {
  await BlogPost.destroy({ where: { id } });
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

module.exports = {
  findAllPosts,
  findPostsById,
  deletePostById,
  getBlogPostById,
  foundTitleOrContent,
};