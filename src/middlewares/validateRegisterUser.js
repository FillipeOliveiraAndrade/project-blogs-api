const validateRegisterUser = (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (displayName.length < 8) {
    const error = new Error('"displayName" length must be at least 8 characters long');
    error.status = 400;
    throw error;
  }

  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!regex.test(email)) {
    const error = new Error('"email" must be a valid email');
    error.status = 400;
    throw error;
  }

  if (password.length < 6) {
    const error = new Error('"password" length must be at least 6 characters long');
    error.status = 400;
    throw error;
  }

  return next();
};

module.exports = validateRegisterUser;