const { Op } = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../models');

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

const removePostById = async ({ id, reqUserId }) => {
  const post = await BlogPost.findByPk(id);

  if (!post) {
    return { type: 404, message: 'Post does not exist' };
  }

  if (post.userId !== reqUserId) {
    return { type: 401, message: 'Unauthorized user' };
  }

  await BlogPost.destroy({ where: { id } });

  return { type: null, message: null };
};

const createPost = async (title, content, userId, categoryIds) => {
  const updated = Date();
  const published = Date();
  const result = await BlogPost.create({ title, content, userId, published, updated });
  const pullResult = await BlogPost.findOne({ where: { title } });
  await PostCategory.create({ postId: pullResult.id, categoryId: categoryIds[0] });
  await PostCategory.create({ postId: pullResult.id, categoryId: categoryIds[1] });
  return {
    id: pullResult.id,
    title: result.title,
    content: result.content,
    userId: result.userId,
    updated: result.updated,
    published: result.published,
  };
};

module.exports = {
  findAllPosts,
  findPostsById,
  getBlogPostById,
  foundTitleOrContent,
  updatedPost,
  removePostById,
  createPost,
};