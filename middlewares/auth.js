const jwt = require('jsonwebtoken');
const { UnauthorizedError, authorizationErrorMessage } = require('../utils/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return next(new UnauthorizedError(authorizationErrorMessage));
  }
  req.user = payload;
  return next();
};
