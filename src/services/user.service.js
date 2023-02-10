const { User } = require('../models');

const createUser = async (user) => {
  const userCreated = await User.create(user);
  return userCreated;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

module.exports = {
  createUser,
  getUserByEmail,
};