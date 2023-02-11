const { Category } = require('../models');

const createCategory = async (category) => {
  const categoryCreated = await Category.create(category);
  return categoryCreated;
};

module.exports = {
  createCategory,
};