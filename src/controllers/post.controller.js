const { findAllPosts } = require('../services/post.service');

const getAllPosts = async (_req, res) => {
  const data = await findAllPosts();

  return res.status(200).json(data);
};

module.exports = { getAllPosts };