const jwt = require('jsonwebtoken');

require('dotenv/config');

const TOKEN_SECRET = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
/*     const error = new Error('Token not found');
    error.status = 401;
    throw error; */
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const verificationResponse = jwt.verify(authorization, TOKEN_SECRET);
    req.user = verificationResponse;
    return next();
  } catch (err) {
/*     const error = new Error('Expired or invalid token');
    error.status = 401;
    throw error; */
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = authenticateToken;