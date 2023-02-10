const { User } = require('../models');

const loginByEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  
  return user;
};

module.exports = {
  loginByEmailAndPassword,
};