const { createUser, getUserByEmail, getAllUsers } = require('../services/user.service');
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

const findAllUsers = async (_req, res) => {
  const users = await getAllUsers();

  return res.status(200).json(users);
};

module.exports = {
  userRegister,
  findAllUsers,
};