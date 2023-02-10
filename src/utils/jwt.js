const jwt = require('jsonwebtoken');

require('dotenv/config');

const TOKEN_SECRET = process.env.JWT_SECRET;

const generateToken = ({ displayName, email, image }) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  return jwt.sign({ displayName, email, image }, TOKEN_SECRET, jwtConfig);
};

const authenticateToken = async (token) => {
  if (!token) {
    const error = new Error('Token not found');
    error.status = 401;
    throw error;
  }

  try {
    const verificationResponse = await jwt.verify(token, TOKEN_SECRET);
    return verificationResponse;
  } catch (err) {
    const error = new Error('Expired or invalid token');
    error.status = 401;
    throw error;
  }
};

module.exports = {
  generateToken,
  authenticateToken,
};
