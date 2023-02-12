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

module.exports = {
  findAllPosts,
  findPostsById,
};