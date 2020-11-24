const jwt = require('jsonwebtoken');

const AuthError = require('../errors/auth-error');

// eslint-disable-next-line no-unused-vars
const handleAuthError = (res) => {
  throw new AuthError('Необходима авторизация');
};
const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};
