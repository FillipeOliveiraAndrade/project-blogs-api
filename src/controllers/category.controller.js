const { createCategory } = require('../services/category.service');

const addNewCategory = async (req, res) => {
  const category = await createCategory(req.body);
  return res.status(201).json(category);
};

module.exports = { 
  addNewCategory,
};