const { createUser, getUserByEmail } = require('../services/user.service');
const { generateToken } = require('../utils/jwt');

const userRegister = async (req, res) => {
  const { email } = req.body;

  const user = await getUserByEmail(email);
  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  } 
  
  await createUser(req.body);
  
  const token = generateToken(req.body);

  return res.status(201).json({ token });
};

module.exports = {
  userRegister,
};