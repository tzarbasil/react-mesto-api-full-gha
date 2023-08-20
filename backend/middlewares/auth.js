const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorizationError');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, (process.env && process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret'));
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
