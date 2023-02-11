const { createCategory, findAllCategories } = require('../services/category.service');

const addNewCategory = async (req, res) => {
  const category = await createCategory(req.body);
  return res.status(201).json(category);
};

const getAllCategories = async (_req, res) => {
  const categories = await findAllCategories();
  return res.status(200).json(categories);
};

module.exports = { 
  addNewCategory,
  getAllCategories,
};