const { generateToken } = require('../utils/jwt');
const { createUser, 
  getUserByEmail, 
  getAllUsers, 
  getUserById,
} = require('../services/user.service');

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

const findUserById = async (req, res) => {
  const { id } = req.params;

  const user = await getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  return res.status(200).json(user);
};

module.exports = {
  userRegister,
  findAllUsers,
  findUserById,
};