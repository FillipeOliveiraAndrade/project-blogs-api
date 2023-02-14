const {
  findAllPosts,
  findPostsById,
  deletePostById,
  foundTitleOrContent,
} = require('../services/post.service');

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

const deletingMyPost = async (req, res) => {
  const { id } = req.params;

  await deletePostById(id);

  return res.status(204).end();
};

const getTitleOrContentForQuery = async (req, res) => {
  const { q } = req.query;

  const post = await foundTitleOrContent(q);
  
  return res.status(200).json(post);
};

module.exports = { 
  getAllPosts,
  getPostsById,
  deletingMyPost,
  getTitleOrContentForQuery,
};