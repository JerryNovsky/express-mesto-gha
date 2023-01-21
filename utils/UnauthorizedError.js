class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

const authorizationErrorMessage = 'Ошибка авторизации';

module.exports = { UnauthorizedError, authorizationErrorMessage };
