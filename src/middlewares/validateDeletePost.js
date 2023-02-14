const { getBlogPostById } = require('../services/post.service');
const { getUserById } = require('../services/user.service');

const validateDeleteBlogPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const getBlogPost = await getBlogPostById(id);
    const getUser = await getUserById(req.user.id);
    console.log(getBlogPost.userId);
    console.log(getUser.id);

    if (!getBlogPost) {
      return res.status(404).json({ message: 'Post does not exist' });
    }

    if (getUser.id !== getBlogPost.attributes.userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = validateDeleteBlogPost;