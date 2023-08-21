// const AuthorizationError = require('../errors/authorizationError');
// create badDataError

module.exports.validator = (req, res, next) => {
  const data = req.body;

  if (Object(data).keys().has('email')) validateEmail(data.email);

  try {
    payload = jwt.verify(token, (process.env && process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret'));
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};

const validateEmail = (email) => String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
