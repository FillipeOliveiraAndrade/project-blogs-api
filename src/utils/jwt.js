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

module.exports = {
  generateToken,
};
