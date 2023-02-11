const validateAddCategory = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    const error = new Error('"name" is required');
    error.status = 400;
    throw error;
  }

  return next();
};

module.exports = validateAddCategory;