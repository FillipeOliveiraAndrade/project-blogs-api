const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error('Some required fields are missing');
    error.status = 400;
    throw error;
  }

  return next();
};

module.exports = validateLogin;