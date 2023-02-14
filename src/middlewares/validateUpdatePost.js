const validateUpdatePost = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    const error = new Error('Some required fields are missing');
    error.status = 400;
    throw error;
  }

  return next();
};

module.exports = validateUpdatePost;