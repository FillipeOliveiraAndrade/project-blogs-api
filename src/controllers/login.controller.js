const { loginByEmailAndPassword } = require('../services/login.service');
const { generateToken } = require('../utils/jwt');

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginByEmailAndPassword(email, password);

  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = generateToken(user.dataValues);

  return res.status(200).json({ token });
};

module.exports = {
  userLogin,
};