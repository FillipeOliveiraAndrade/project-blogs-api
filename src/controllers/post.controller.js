const {
  findAllPosts,
  findPostsById,
  foundTitleOrContent,
  updatedPost,
  getBlogPostById,
  removePostById,
  createPost,
} = require('../services/post.service');
const { getUserByEmail } = require('../services/user.service');

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

const deletingPost = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await removePostById({ id, reqUserId: req.user.id });

  if (type) {
    return res.status(type).json({ message });
  }

  return res.status(204).end();
};

const addNewPost = async (req, res) => {
  try {
    const { email } = req.user;
    const { title, content, categoryIds } = req.body;
    const { id } = await getUserByEmail(email);
    const dataPost = await createPost(title, content, id, categoryIds);
    return res.status(201).json(dataPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  getAllPosts,
  getPostsById,
  getTitleOrContentForQuery,
  updatePostById,
  deletingPost,
  addNewPost,
};