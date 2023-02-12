const { findAllPosts, findPostsById } = require('../services/post.service');

const getAllPosts = async (_req, res) => {
  const data = await findAllPosts();

  return res.status(200).json(data);
};

const getPostsById = async (req, res) => {
  const { id } = req.params;

  const data = await findPostsById(id);

  if (!data) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(data);
};

module.exports = { 
  getAllPosts,
  getPostsById,
};