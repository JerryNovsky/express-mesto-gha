const jwt = require('jsonwebtoken');
const { UnauthorizedError, authorizationErrorMessage } = require('../utils/UnauthorizedError');
const { JWT_SECRET } = require('../utils/token');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(authorizationErrorMessage));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(authorizationErrorMessage));
  }

  req.user = payload;
  return next();
};
