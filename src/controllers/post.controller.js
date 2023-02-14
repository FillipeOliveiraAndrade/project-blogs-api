const {
  findAllPosts,
  findPostsById,
  foundTitleOrContent,
  updatedPost,
  getBlogPostById,
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

const getTitleOrContentForQuery = async (req, res) => {
  const { q } = req.query;

  const post = await foundTitleOrContent(q);
  
  return res.status(200).json(post);
};

const updatePostById = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const data = { title, content, id, reqUserId: req.user.id };

  const userId = await getBlogPostById(id);

  if (req.user.id !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  const postUpdated = await updatedPost(data);

  return res.status(200).json(postUpdated);
};

module.exports = { 
  getAllPosts,
  getPostsById,
  getTitleOrContentForQuery,
  updatePostById,
};