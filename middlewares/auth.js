const jwt = require('jsonwebtoken');
const { UnauthorizedError, authorizationErrorMessage } = require('../utils/UnauthorizedError');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Привет!'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'strong-key');
  } catch (err) {
    return next(new UnauthorizedError(authorizationErrorMessage));
  }

  req.user = payload;
  return next();
};
