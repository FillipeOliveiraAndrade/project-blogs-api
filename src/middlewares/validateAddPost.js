const { findAllCategories } = require('../services/category.service');

const validateAddPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (title === '' && content === '' && categoryIds.length === 0) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  const lengthCategory = await findAllCategories();
  if (categoryIds[1] > lengthCategory.length) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }
  next();
};

module.exports = validateAddPost;