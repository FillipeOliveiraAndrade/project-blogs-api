const { User } = require('../models');

const createUser = async (user) => {
  const userCreated = await User.create(user);
  return userCreated;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  return user;
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
};